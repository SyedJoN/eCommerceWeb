import { React } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import MultiRangeSlider from "./DualRangeSlider";

function DisclosureComponent({ title, minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  return (
    <Disclosure className="transition-transform duration-200 ease-linear">
      {({ open }) => (
        <>
          <Disclosure.Button className="group flex w-full justify-between items-center gap-2">
            {title}
            <ChevronDownIcon
              className={`w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <MultiRangeSlider
              min={minPrice}
              max={maxPrice}
              onChange={({ min, max }) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default DisclosureComponent;
