// import { useSelector } from 'react-redux';

const Navbar = () => {
    // const user = useSelector((state) => state.auth);

  return (
    <div className="absolute p-4 top-0  w-full">
      <div
        className="px-5 py-1 font-bold text-3xl"
        style={{ color: "var(--theme-color)" }}
      >
        SprintBoard 
      </div>
    </div>
  );
};

export default Navbar;
