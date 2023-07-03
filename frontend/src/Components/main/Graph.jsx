import React from 'react';
import { Area } from '@ant-design/plots';
import { useGlobalContext } from "../../StateContext";

export const Graph = () => {
	const { curuser } = useGlobalContext();
	const data = [];

	const aObjects = curuser?.quarter.map((quarter, index) => ({
		type: "Total Score",
		date: `Quarter ${index + 1}`,
		value: quarter.scoreOfEvaluation.totalScore
	}));

	const bObjects = curuser?.quarter.map((quarter, index) => ({
		type: "Self Appraisal Score",
		date: `Quarter ${index + 1}`,
		value: quarter.scoreOfEvaluation.selfAppraisalScore
	}));

	const cObjects = curuser?.quarter.map((quarter, index) => ({
		type: "Achievement Beyond Scope Score",
		date: `Quarter ${index + 1}`,
		value: quarter.scoreOfEvaluation.achievementBeyondScore
	}));

	data.push(...aObjects, ...bObjects, ...cObjects);

	console.log(data);
	const config = {
		data,
		xField: 'date',
		yField: 'value',
		seriesField: 'type',
		smooth: true,
		slider: {
			start: 0.1,
			end: 0.9,
		},
	};

	return (
		<div className='chart-container'>
			<Area {...config} />
		</div>
	);
};