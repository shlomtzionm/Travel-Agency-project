import image from "../../../assets/images/goBack.gif";
export function NotAuthorized(): JSX.Element {
  return (
    <>
      <p>You are not authorized</p>
      <img src={image} style={{ paddingTop: "60px" }} />
    </>
  );
}
