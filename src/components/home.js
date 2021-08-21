import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";

function Home() {
  return (
    <div className="app_container container">
      <Grid container spacing={8} className="article_card">
        <Grid item xs={12} sm={6} lg={6}>
          <Card style={{ backgroundColor: "#50DBB4" }}>
            <CardActionArea component={RouterLink} to={`/itemlist`}>
              <IconButton>
                <ListAltIcon
                  style={{
                    fontSize: "200px",
                  }}
                />
              </IconButton>

              <CardContent
                style={{
                  overflow: "hidden",
                  height: "8rem",
                }}
              >
                <Typography gutterBottom variant="h3" component="h3">
                  Item List
                </Typography>
              </CardContent>
              <CardActions disableSpacing></CardActions>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <Card
            style={{
              background: " linear-gradient(90deg, #EFF54D 0%, #00AC61 100%)",
            }}
          >
            <CardActionArea component={RouterLink} to={`/pomodoro`}>
              <IconButton>
                <AccessAlarmIcon
                  style={{
                    alignItems: "center",
                    fontSize: "200px",
                  }}
                />
              </IconButton>

              <CardContent
                style={{
                  overflow: "hidden",
                  height: "8rem",
                }}
              >
                <Typography gutterBottom variant="h3" component="h3">
                  Pomodoro
                </Typography>
              </CardContent>
              <CardActions disableSpacing></CardActions>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
