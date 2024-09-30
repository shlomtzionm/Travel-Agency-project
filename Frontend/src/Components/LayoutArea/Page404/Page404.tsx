import image from "../../../assets/images/404.jpg";
function Page404(): JSX.Element {
    
  return (
    <div >
      <p>The page you are looking for doesn't exist.</p>
      <img src={image} />
    </div>
  );
}

export default Page404;
