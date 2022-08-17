import { Drawer } from "@mui/material";
import Checkout from "../Component/Checkout/Checkout";
import { useAppContext } from "../../public/src/shared/context/state";

const DrawerContainer = () => {
  const { openCart, setOpenCart } = useAppContext();
  return (
    <div className="w-1/2">
      <Drawer
        anchor="right"
        open={openCart}
        onClose={() => setOpenCart(false)}
        PaperProps={{
          sx: { width: "50%", backgroundColor: "rgb(30 41 59)" },
        }}
      >
        <Checkout />
      </Drawer>
    </div>
  );
};

export default DrawerContainer;
