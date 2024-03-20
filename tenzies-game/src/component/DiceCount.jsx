import { useState, useEffect } from "react"


export default function DiceCount(props) {

    const [timer, setTimer] = useState(() => JSON.parse(localStorage.getItem("bestTime")) || []);

    const [currentTime, setCurrentTime] = useState([]);

    const [BestTime, setBestTime] = useState([]);





    // on first render, local storage saves an empty timer array. and waits for timer to load values into array to resave
    useEffect(() => {


        localStorage.setItem("bestTime", JSON.stringify(timer));


        setBestTime(newBestTimer());



    }, [timer])







    useEffect(() => {

        if (props.tenzies) {

            const date = new Date();

            const currentTimeMins = date.getMinutes();

            const currentTimeSecs = date.getSeconds();

            const oldTimeMins = props.time.getMinutes();

            const oldTimeSecs = props.time.getSeconds();

            const timeState = [currentTimeMins - oldTimeMins, Math.abs(currentTimeSecs - oldTimeSecs)];

            setTimer(prevTime => [timeState, ...prevTime]);

            setCurrentTime(timeState);
        }

    }, [props.tenzies])



    function newBestTimer() {


        if (timer != "") {

            let miniNum0 = timer[0][0];
            let miniNum1 = timer[0][1];

            for (let i = 0; i < timer.length; i++) {

                if (miniNum0 >= timer[i][0] && miniNum1 <= timer[i][1]) {
                    miniNum0 = timer[i][0];
                    miniNum1 = timer[i][1];

                } else if (miniNum0 > timer[i][0] || miniNum1 < timer[i][1]) {

                    miniNum0 = timer[i][0];
                    miniNum1 = timer[i][1];
                }
            };

            return [miniNum0, miniNum1];

        };

    };




    return (
        <div className="record">
            <div>{`Total Number of Rows : ${props.count}`}</div>
            <p >{`Time Spent : ${currentTime[0] <= 0 ? "" : currentTime[0] === 1 ? currentTime[0] + "min" : currentTime[0] + "mins"} ${currentTime[1] <= 0 ? "" : currentTime[1] + "secs"}`}</p>
            {BestTime && <p>{`Best Time Ever : ${BestTime[0] <= 0 ? "" : BestTime[0] === 1 ? BestTime[0] + "min" : BestTime[0] + "mins"} ${BestTime[1] + "secs"} ${currentTime[1] === BestTime[1] ? "New Record!!" : ""}`}</p>}

        </div>

    )
}
