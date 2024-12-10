import { useNavigate } from "react-router-dom";

const Component = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/destination"); // Navigue vers '/destination'
  };

  return <button onClick={handleClick}>Aller à Destination</button>;
};
