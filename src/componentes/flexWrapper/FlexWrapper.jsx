import "./flexwrapper.css";

function FlexWrapper(props) {
  return <div className="flex my-5 mx-3">{props.children}</div>;
}

export default FlexWrapper;