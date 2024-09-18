import { useState } from "react";

function useSlidingForm() {
  const [showSlidingForm, setShowSlidingForm] = useState(false);
  return [showSlidingForm, setShowSlidingForm];
}

export default useSlidingForm;
