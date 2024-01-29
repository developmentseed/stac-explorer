import { useState } from "react";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { parse } from "tinyduration";

function epochToDisplayDate(epoch: number): string {
  return new Date(epoch).toUTCString();
}

type Props = {
  min: string;
  max?: string | null;
  step: string;
  "aria-labelledby": string;
  setSelectedTime: (dateTime: string) => void;
}

function DateTimeSlider({
  min,
  max,
  step,
  "aria-labelledby": ariaLabelledBy,
  setSelectedTime
}: Props) {
  const minMs = min ? Date.parse(min) : 0;
  const maxMs = max ? Date.parse(max) : Date.now();
  const [ internalTime, setInternalTime ] = useState<number>(minMs);

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
        aria-valuetext={epochToDisplayDate(internalTime)}
        min={minMs}
        max={maxMs}
        step={interval}
        defaultValue={minMs}
        onChange={(v) => setInternalTime(v)}
        onChangeEnd={(v) => setSelectedTime(new Date(v).toISOString())}
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
        { epochToDisplayDate(internalTime) }
      </Text>
    </>
  )
}

export default DateTimeSlider;
