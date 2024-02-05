import { Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import React from "react";
import { parse } from "tinyduration";

function epochToDisplayDate(epoch?: number): string | undefined {
  return epoch ? new Date(epoch).toUTCString() : undefined;
}

type Props = {
  min: string;
  max?: string | null;
  step: string;
  "aria-labelledby": string;
  onChange: (dateTime: string) => void;
  onChangeEnd: (dateTime: string) => void
  value: string;
}

function DateTimeSlider({
  min,
  max,
  step,
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
      <Slider
        aria-labelledby={ariaLabelledBy}
        aria-valuetext={epochToDisplayDate(valueMs)}
        min={minMs}
        max={maxMs}
        step={interval}
        defaultValue={minMs}
        value={valueMs}
        onChange={(v) => onChange(new Date(v).toISOString())}
        onChangeEnd={(v) => onChangeEnd(new Date(v).toISOString())}
        {...field}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
          <SliderThumb />
      </Slider>
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
