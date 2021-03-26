(function() {
	'use strict'
	let consoleStyles = {
		'font-size'        : '14px',
		'padding'          : '2px 5px',
		'color'            : '#499e4b',
		//'background-color' : '#282828'
	},
	floatPrecision = 0        // Количество знаков после запятой для дробных чисел. 0 — вывод строкой

	/* Сохраняем нативную функцию */
	console.log_ = console.log

	/* Переопределяем функцию */
	console.log = function(...params) {
		let styles    = [],    // Стили для вывода
		    logParams = []     // Параметры для console.log

		params.forEach(param => {
			let type = 's'
			switch (typeof(param))
			{
				case 'object':
					type = 'o'
					break
				case 'number':
					if (param % 1 != 0)
					{
						if (floatPrecision != 0)
							type = `.${floatPrecision}f`
					}
					else
						type = 'd'
					break
			}
			let constyle = []
			for (let styleName in consoleStyles)
				constyle.push(styleName + ':' + consoleStyles[styleName])

			if (type != 'o' && styles.length && styles[styles.length - 1] != '%c%o')
				styles.push(`%${type}`)
			else
			{
				styles.push(`%c%${type}`)
				logParams.push(constyle.join(';'))
			}
			logParams.push(param)
		})

		console.log_(styles.join(' '), ...logParams)
	}
})()
