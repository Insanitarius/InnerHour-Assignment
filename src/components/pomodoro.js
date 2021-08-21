import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Grid, Card, CardContent, AppBar, Tabs, Tab } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
}

const Pomodoro = () => {
  const cycle = useRef();
  const [cycles, setCycles] = useState(0);
  const [value, setValue] = useState(0);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [toggleShortBreak, setToggleShortBreak] = useState(true);
  const [workTime, setWorkTime] = useState(false);

  const restartTimer = () => {
    setReset(false);
    setValue(0);
    setStart(false);
    setMinutes(25);
    setSeconds(0);
    setToggleShortBreak(true);
  };

  useEffect(() => {
    if (start && cycles === 0) {
      if (reset) {
        toast.success("Entire cycle completed successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      restartTimer();
    }

    if (!reset) {
      setSeconds(0);
    }

    if (start && cycles !== 0) {
      let interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            if (workTime) {
              setValue(1);
              setCycles(cycles - 1);
            } else {
              setToggleShortBreak(!toggleShortBreak);
              setValue(2);
            }
            let minute = workTime ? 24 : 4;
            let second = 59;

            setSeconds(second);
            setMinutes(minute);
            setWorkTime(!workTime);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [seconds, start]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handleTabs = (e, value) => {
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cycle.current.value === "") {
      toast.error("Please enter a cycle", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setCycles(cycle.current.value);
      setReset(true);
      setStart(true);
      setValue(1);
    }
  };

  return (
    <>
      <h1
        className="mb-4"
        style={{ textDecoration: "underline", textDecorationColor: "#51E1ED" }}
      >
        Pomodoro Timer
      </h1>
      <div className="app_container container">
        <Grid container spacing={0} className="article_card">
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <Card
              style={{
                background: "linear-gradient(to right, #bbd2c5, #CAD5E2)",
              }}
            >
              <AppBar position="relative" color="transparent">
                <Tabs
                  value={value}
                  onChange={handleTabs}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="on"
                >
                  <Tab label="Set Cycle" />
                  <Tab disabled={!toggleShortBreak} label="Pomodoro" />
                  <Tab disabled={toggleShortBreak} label="Short Break" />
                </Tabs>
                <CardContent>
                  <TabPanel value={value} index={0}>
                    {reset ? (
                      <Button
                        variant="danger"
                        onClick={() => {
                          toast.success("Reset successful!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                          setCycles(0);
                          restartTimer();
                        }}
                      >
                        Reset Timer
                      </Button>
                    ) : (
                      <Form onSubmit={handleSubmit} className="mt-2">
                        <Form.Group>
                          <div
                            className="container"
                            style={{ maxWidth: "300px" }}
                          >
                            <Form.Control
                              type="number"
                              placeholder="Add number of cycle"
                              name="cycle"
                              style={{ textAlign: "center" }}
                              ref={cycle}
                            />
                          </div>
                        </Form.Group>

                        <Button
                          className="miami mt-1"
                          variant="primary"
                          type="submit"
                        >
                          Start
                        </Button>
                      </Form>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <CircularProgressbar
                      value={
                        ((25 * 60 - (timerMinutes * 60 + timerSeconds)) /
                          (25 * 60)) *
                        100
                      }
                      text={timerMinutes + ":" + timerSeconds}
                      styles={buildStyles({
                        textColor: "#646464",
                        pathColor: "#E03B8B",
                        tailColor: "#758283",
                      })}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {/* old = ((5 - timerMinutes) / 5) * 100 
                     new = (((5*60) -( timerMinutes* 60 + timerSeconds))/5*60)*100    */}
                    <CircularProgressbar
                      value={
                        ((5 * 60 - (timerMinutes * 60 + timerSeconds)) /
                          (5 * 60)) *
                        100
                      }
                      text={timerMinutes + ":" + timerSeconds}
                      styles={buildStyles({
                        textColor: "#646464",
                        pathColor: "#22CB5C",
                        tailColor: "#758283",
                      })}
                    />
                  </TabPanel>
                </CardContent>
              </AppBar>
            </Card>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    </>
  );
};

export default Pomodoro;
