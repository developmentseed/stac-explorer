import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from "@chakra-ui/react";
import React from "react";
import { parse } from "tinyduration";

function epochToDisplayDate(epoch?: number): string | undefined {
  return epoch ? new Date(epoch).toUTCString() : undefined;
}

type Props = {
  min: string;
  max?: string | null;
  step?: string;
  "aria-labelledby": string;
  onChange: (dateTime: string) => void;
  onChangeEnd: (dateTime: string) => void
  value: string;
}

function DateTimeSlider({
  min,
  max,
  step = "P1D",
  "aria-labelledby": ariaLabelledBy,
  value,
  onChange,
  onChangeEnd,
  ...field
}: Props) {
  const minMs = min ? Date.parse(min) : 0;
  const maxMs = max ? Date.parse(max) : Date.now();
  const valueMs = value ? Date.parse(value) : undefined;

  const { days, hours, minutes, seconds } = parse(step);
  const interval = 
    (seconds || 0) * 1000 +
    (minutes || 0) * 60 * 1000 + 
    (hours || 0) * 60 * 60 * 1000 + 
    (days || 0) * 24 * 60 * 60 * 1000;
  return (
    <>
      <RangeSlider
        // aria-labelledby={ariaLabelledBy}
        // aria-valuetext={epochToDisplayDate(valueMs)}
        min={minMs}
        max={maxMs}
        step={interval}
        defaultValue={[minMs, minMs + interval]}
        //value={[minMs, valueMs || minMs + interval]}
        onChange={(values) => {
          const dateStrings = values.map(v => new Date(v).toISOString()).join("/")
          return onChange(dateStrings);
        }}
        onChangeEnd={(values) => {
          const dateStrings = values.map(v => new Date(v).toISOString()).join("/")
          return onChangeEnd(dateStrings);
        }}
        {...field}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
      </RangeSlider>
      
      <Text
        as="div"
        fontSize="sm"
        aria-hidden={true}
      >
        { epochToDisplayDate(valueMs) }
      </Text>
    </>
  )
}

export default React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => (
    <DateTimeSlider {...props} />
  )
);;
