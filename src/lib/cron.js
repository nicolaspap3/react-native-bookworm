import cron from "cron";
import https from "https"
import "dotenv/config"

const job = new cron.CronJob("*/14 * * * *", function () {
  https.get(process.env.API_URL, (res) => {
    if (res.statusCode === 2000) console.log("GET request sent successfully");
    else console.log("GET request failed", res.statusCode)
  })
    .on("error", e => console.error("Error while sending request", e))
})

export default job;

//MINUTE,HOR,DAY OF MONTH,MONTH,DAY OF THE WEEK

//* 30 3 15 * * - At 3:30am, on the 15th every month