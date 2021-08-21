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
    <div className="app_container container">
      <Grid container spacing={0} className="article_card">
        <Grid item xs></Grid>
        <Grid item xs={6}>
          {/* style={{ backgroundColor: "#50DBB4" }} */}
          <Card>
            <AppBar position="relative" color="transparent">
              <Tabs
                value={value}
                onChange={handleTabs}
                indicatorColor="primary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="on"
              >
                <Tab label="Set Cycle" />
                <Tab disabled={!toggleShortBreak} label="Pomodoro" />
                <Tab disabled={toggleShortBreak} label="Short Break" />
              </Tabs>
              <CardContent
              // style={{
              //   overflow: "hidden",
              //   height: "15fr",
              // }}
              >
                <TabPanel value={value} index={0}>
                  {reset ? (
                    <Button
                      // className="miami mt-1"
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
                  {/* {timerMinutes}:{timerSeconds} */}
                  <CircularProgressbar
                    value={((25 - timerMinutes) / 25) * 100}
                    text={timerMinutes + ":" + timerSeconds}
                    styles={buildStyles({
                      textColor: "#eee",
                      pathColor: "red",
                      tailColor: "rgba(255,255,255,.2)",
                    })}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {/* {timerMinutes}:{timerSeconds} */}
                  <CircularProgressbar
                    value={((5 - timerMinutes) / 5) * 100}
                    text={timerMinutes + ":" + timerSeconds}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "green",
                      tailColor: "rgba(255,255,255,.2)",
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
  );
};

export default Pomodoro;
