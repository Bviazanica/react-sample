import { Checkbox as BaseCheckbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { useState } from "react";

export const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <BaseCheckbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      labelPlacement={LABEL_PLACEMENT.right}
    />
  );
};
