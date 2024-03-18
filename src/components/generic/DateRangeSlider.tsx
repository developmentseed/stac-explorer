import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from "@chakra-ui/react";
import { durationToMs, epochToDisplayDate } from "../../utils";

type Props = {
  min?: string | null;
  max?: string | null;
  "aria-label": string;
  value?: string;
  rangeBoundary?: [string, string];
  onChange: (dateRange: string) => void;
  onChangeEnd: (dateRange: string) => void
}

function DateRangeSlider({
  min,
  max,
  "aria-label": ariaLabel,
  value,
  rangeBoundary,
  onChange,
  onChangeEnd
}: Props) {
  const minMs = min ? Date.parse(min) : 0;
  const maxMs = max ? Date.parse(max) : Date.now();

  const vals = value ? value!.split('/') : [undefined, undefined];
  const valueMin  = (!vals[0] || vals[0] === '..') ? minMs : Date.parse(vals[0]);
  const valueMax  = (!vals[1] || vals[1] === '..') ? maxMs : Date.parse(vals[1]);

  const handleChange = (v: number[]) => {
    if (rangeBoundary) {
      const minRange = durationToMs(rangeBoundary[0]);
      const maxRange = durationToMs(rangeBoundary[1]);
      
      const newRange = v[1] - v[0];
      console.log(minRange, maxRange, newRange);

      if (newRange < minRange || newRange > maxRange) {
        return;
      }
    }
    
    onChange(v.map(d => new Date(d).toISOString()).join('/'));
  }

  return (
    <>
      <RangeSlider
        aria-label={[`${ariaLabel} (start date)`, `${ariaLabel} (end date)`]}  // eslint-disable-line jsx-a11y/aria-proptypes
        aria-valuetext={[epochToDisplayDate(valueMin)!, epochToDisplayDate(valueMax)!]}  // eslint-disable-line jsx-a11y/aria-proptypes
        defaultValue={[minMs, maxMs]}
        min={minMs}
        max={maxMs}
        value={[ valueMin, valueMax ]}
        onChange={handleChange}
        onChangeEnd={(v) => onChangeEnd(v.map(d => new Date(d).toISOString()).join('/'))}
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
        From: {epochToDisplayDate(valueMin)} To: {epochToDisplayDate(valueMax)}
      </Text>
    </>
  )
}

export default DateRangeSlider;
