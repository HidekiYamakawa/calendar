const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Holiday");
const Holiday = mongoose.model('holiday');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
})

mongoose.connect('mongodb://localhost/calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("Mongodb connection sucessfully!")
}).catch(() => {
    console.log("Error: Mongodb connection failed!")
});

app.get("/holiday", (req, res) => {
    Holiday.find({}).then((holiday) => {
        return res.json(holiday);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Error: request GET /holiday failed!"
        })
    })
});

app.get("/holiday/:id", (req, res) => {
    Holiday.findOne({_id: req.params.id}).then((holiday) => {
        return res.json(holiday);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Error: request GET /holiday/:id failed!"
        })
    })
})

app.post("/holiday", (req, res) => {
    const holiday = Holiday.create(req.body, (err) => {
        if(err) {
            return res.status(400).json({
                error: true,
                message: "Error: Holiday has failed to register!"
            })
        }

        return res.status(200).json({
            error: false,
            message: "Holiday sucessfully registered!"
        })
    })
});

app.put("/holiday/:id", (req, res) => {
    const holiday = Holiday.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) {
            return res.status(400).json({
                error: true,
                message: "Error: Holiday has failed to update!"
            });
        }

        return res.json({
            error: false,
            message: "Holiday sucessfully updated!"
        });
    });
});

app.delete("/holiday/:id", (req, res) => {
    const holiday = Holiday.deleteOne({_id: req.params.id}, (err) => {
        if(err) {
            return res.status(400).json({
                error: true,
                message: "Error: Holiday has failed to delete!"
            });
        }

        return res.json({
            error: false,
            message: "Holiday sucessfully deleted!"
        })

    });
})

app.listen(3333, () => {
    console.log("Server is running on 3333!");
});