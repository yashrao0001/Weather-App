import "./ErrorPage.css";
import errImg from "../assets/err.jpg";

export default function ErrorPage({ errMsg }) {
  return (
    <div className="errPage">
      <div className="border">
        <img src={errImg} alt="errImg" />
        <div className="description">
          <h1>ERROR</h1>
          <h4>{errMsg}</h4>
          <p>Please refresh and try again!</p>
        </div>
      </div>
    </div>
  );
}
