import { useEffect, useState } from "react";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";

const ButtonComponent = ({ postUserId, published, onClick }) => {
  const { data: session } = useSession();

  const [purchaseEnabled, enablePurchase] = useState(false);
  const [sellEnabled, enableSell] = useState(false);

  useEffect(() => {
    const { user } = { ...session };
    enableSell(!_.isEmpty(user) && user.id === postUserId && !published);
    enablePurchase(!_.isEmpty(user) && user.id !== postUserId);
  }, [session]);

  if (!session) return null;

  if (!sellEnabled && !purchaseEnabled) {
    return (
      <Button disabled style={{ color: "red" }}>
        Selling
      </Button>
    );
  }

  return (
    <Button
      color="success"
      variant="outlined"
      onClick={(e) => onClick(e, purchaseEnabled)}
    >
      {purchaseEnabled ? "Purchase" : "Sell"}
    </Button>
  );
};

export default ButtonComponent;
