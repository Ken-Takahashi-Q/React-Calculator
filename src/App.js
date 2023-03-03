import './App.css';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

export default function App() {
	// For theme
	const [isDarkMode, setIsDarkMode] = useState(true);
	
	const selectMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	// For calculation
	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");

	const ops = ['/', '*', '+', '-', '.'];

	const updateCalc = value => {
		// Don't calculate when equation not completed
		if (
			(ops.includes(value) && calc === "") ||
			(ops.includes(value) && ops.includes(calc.slice(-1)))
		) {
			return;
		}

		setCalc(calc + value);
		if (!ops.includes(value)) {
			setResult(eval(calc + value).toString());
		}
	};

	const calculate = () => {
		setCalc(eval(calc).toString());
	};

	const allClear = () => {
		setCalc("")
		setResult("")
	};

	const deleteLast = () => {
		if (calc === "") {
			return;
		}

		const value = calc.slice(0, -1);
		setCalc(value);
	};
	
	return (
		<div className="App">
			<div className="mode_box">
				<span id="dark_indicator" style={{ visibility: isDarkMode ? 'visible' : 'hidden' }}><p>Dark Mode</p></span>

				<div className="mode">
					
					<input type="checkbox" id="switch" isOn={isDarkMode} onChange={selectMode}/>
					<label for="switch"></label>
				</div>

				<span id="light_indicator" style={{ visibility: isDarkMode ? 'hidden' : 'visible' }}><p>Light Mode</p></span>
			</div>
			{/* <div className="mode">
				<span id="dark_indicator" style={{ display: isDarkMode ? 'inline' : 'none' }}><p>Dark Mode</p></span>

				<input type="checkbox" id="switch" isOn={isDarkMode} onChange={selectMode}/>
				<label for="switch"></label>

				<span id="light_indicator" style={{ display: isDarkMode ? 'none' : 'inline' }}><p>Light Mode</p></span>

			</div> */}
			
			<main className="calculator">
				<div className="display">
					{ calc || "0" }
				</div>

				<div className="numpad">
					<div className="cell_11">
						<button style={{width: "100%"}} className="tool" onClick={allClear}>AC</button>
					</div>

					<div className="cell_13">
						<button className="tool" onClick={deleteLast}><FontAwesomeIcon icon={faDeleteLeft} /></button>
					</div>

					<div className="cell_14">
						<button className="operant" onClick={() => updateCalc('/')}>/</button>
					</div>

					<div className="cell_21">
						<button onClick={() => updateCalc('7')}>7</button>
					</div>

					<div className="cell_22">
						<button onClick={() => updateCalc('8')}>8</button>
					</div>

					<div className="cell_23">
						<button onClick={() => updateCalc('9')}>9</button>
					</div>
					
					<div className="cell_24">
						<button className="operant" onClick={() => updateCalc('*')}>*</button>
					</div>

					<div className="cell_31">
						<button onClick={() => updateCalc('4')}>4</button>
					</div>

					<div className="cell_32">
						<button onClick={() => updateCalc('5')}>5</button>
					</div>

					<div className="cell_33">
						<button onClick={() => updateCalc('6')}>6</button>
					</div>
					
					<div className="cell_34">
						<button className="operant" onClick={() => updateCalc('-')}>-</button>
					</div>

					<div className="cell_41">
						<button onClick={() => updateCalc('1')}>1</button>
					</div>

					<div className="cell_42">
						<button onClick={() => updateCalc('2')}>2</button>
					</div>

					<div className="cell_43">
						<button onClick={() => updateCalc('3')}>3</button>
					</div>

					<div className="cell_44">
						<button className="operant" onClick={() => updateCalc('+')}>+</button>
					</div>

					<div className="cell_51">
						<button style={{width: "100%"}} onClick={() => updateCalc('0')}>0</button>
					</div>

					<div className="cell_53">
						<button onClick={() => updateCalc('.')}>.</button>
					</div>

					<div className="cell_54">
						<button className="operant" onClick={calculate}>=</button>
					</div>

					
				</div>
			</main>
		</div>
	);
}
