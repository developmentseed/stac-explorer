import { Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import React from "react";
import { parse } from "tinyduration";

function epochToDisplayDate(epoch?: number): string | undefined {
  return epoch ? new Date(epoch).toUTCString() : undefined;
}

type Props = {
  min: string;
  max?: string | null;
  step?: string;
  datetime_range?: string;
  "aria-labelledby": string;
  onChange: (dateTime: string) => void;
  onChangeEnd: (dateTime: string) => void
  value: string;
}

function DateTimeSlider({
  min,
  max,
  step = "P1D",
  datetime_range,
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
  const slider_interval = 
    (seconds || 0) * 1000 +
    (minutes || 0) * 60 * 1000 + 
    (hours || 0) * 60 * 60 * 1000 + 
    (days || 0) * 24 * 60 * 60 * 1000;
  let range_parsed;
  let selection_range = 0;
  if (datetime_range) {
    range_parsed = parse(datetime_range);
    selection_range = 
      (range_parsed.seconds || 0) * 1000 +
      (range_parsed.minutes || 0) * 60 * 1000 + 
      (range_parsed.hours || 0) * 60 * 60 * 1000 + 
      (range_parsed.days || 0) * 24 * 60 * 60 * 1000;
  }
  return (
    <>
      <Slider
        aria-labelledby={ariaLabelledBy}
        aria-valuetext={epochToDisplayDate(valueMs)}
        min={minMs}
        max={maxMs}
        step={slider_interval}
        defaultValue={minMs}
        value={valueMs}
        onChange={(v) => {
          let date_string = new Date(v).toISOString();
          if (datetime_range) {
            date_string = `${date_string}/${new Date(v + selection_range).toISOString()}`
          }
          return onChange(date_string)
        }}
        onChangeEnd={(v) => {
          let date_string = new Date(v).toISOString();
          if (datetime_range) {
            date_string = `${date_string}/${new Date(v + selection_range).toISOString()}`
          }
          return onChangeEnd(date_string)
        }}
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
  (props: Props, ref) => {
    return <DateTimeSlider {...props} />
  }
);
