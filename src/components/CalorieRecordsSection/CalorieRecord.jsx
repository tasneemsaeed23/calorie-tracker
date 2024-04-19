import "./CalorieRecord.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyleRecordCell from "../Common/StyledRecoredCell";

function CalorieRecord(props) {
  let recordContent = (
    <>
      <li>{props.meal}</li>
      <li>{props.content}</li>
    </>
  );

  if (props.calories < 0) {
    recordContent = (
      <>
        <li></li>
        <li>Invalid calories</li>
      </>
    );
  }
  return (
    <ul className="record">
      <li>
        <CalorieRecordDate date={props.date} />
      </li>
      {recordContent}
      <li className="record-calories">
        <StyleRecordCell>{props.calories}</StyleRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
