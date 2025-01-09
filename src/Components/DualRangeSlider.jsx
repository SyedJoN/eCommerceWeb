import React, { useCallback, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

const DualRangeSlider = ({ min, max, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  
  const debouncedOnChange = useCallback(
    debounce((values) => {
      onChange?.(values);
    }, 200),
    [onChange]
  );
  return (
    <>
      <MultiRangeSlider
        min={0}
        max={5000}
        canMinMaxValueSame={true}
        caption={false}
        step={10}
        onInput={(e) => {
          setMinValue(e.minValue);
          setMaxValue(e.maxValue);
        }}
        onChange={(e) => {
          setMinValue(e.minValue);
          setMaxValue(e.maxValue);
         debouncedOnChange({ min: e.minValue, max: e.maxValue });
        }}
        label={false}
        ruler={false}
        style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
        barLeftColor="black"
        barInnerColor="black"
        barRightColor="black"
        thumbLeftColor="white"
        thumbRightColor="white"
      />
      <div className="divOutput flex justify-between items-center">
        <div>Rs. {min}</div>
        <div>Rs. {max}</div>
      </div>
    </>
  );
};

DualRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func, // Optional callback
};

export default DualRangeSlider;
