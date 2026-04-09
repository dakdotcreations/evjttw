/**
 * Given an ordered list of steps (each with durationDays / durationHours),
 * returns a human-readable label for a step's date range within the itinerary.
 *
 * Examples:
 *   step with durationDays=1  → "Day 1"
 *   step with durationDays=2  → "Days 1–2" (or "Days 4–5" when cumulative)
 *   step with durationHours=6 → "Day 3 · 6 hrs"
 *   step with no duration     → "Day N"
 */

export interface StepDuration {
	durationDays: number | null;
	durationHours: number | null;
}

export interface StepLabel {
	/** e.g. "Day 1" or "Days 2–3" */
	days: string;
	/** e.g. "6 hrs" or null */
	hours: string | null;
}

export function buildStepLabels(steps: StepDuration[]): StepLabel[] {
	const labels: StepLabel[] = [];
	let dayCounter = 1;

	for (const step of steps) {
		const days = step.durationDays && step.durationDays > 0 ? step.durationDays : null;
		const hours = step.durationHours && step.durationHours > 0 ? step.durationHours : null;

		let daysLabel: string;
		if (days === null || days === 1) {
			daysLabel = `Day ${dayCounter}`;
		} else {
			daysLabel = `Days ${dayCounter}–${dayCounter + days - 1}`;
		}

		labels.push({
			days: daysLabel,
			hours: hours ? `${hours} hr${hours === 1 ? '' : 's'}` : null
		});

		dayCounter += days ?? 1;
	}

	return labels;
}
