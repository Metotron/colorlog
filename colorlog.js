(function() {
	'use strict'
	let consoleStyles = {
		'font-size'        : '14px',
		'padding'          : '2px 5px',
		'color'            : '#499e4b',
		//'background-color' : '#282828'
	},
	floatPrecision = 0        //Количество точек после запятой для дробных чисел. 0 — вывод строкой

	/* Сохраняем нативную функцию */
	console.log_ = console.log

	/* Переопределяем функцию */
	console.log = function(...params) {
		let styles    = [],    //Стили для вывода
		    logParams = [],	    //Параметры для console.log
		    prevType  = null   //Служебная переменная

		params.forEach(param => {
			let type = 's'
			switch (typeof(param))
			{
				case 'object':
					type = 'o'
					break
				case 'number':
					type = 'd'
					if (param % 1 != 0)
					{
						type = (floatPrecision == 0) ? 's' : `.${floatPrecision}f`
					}
					break
			}
			let constyle = []
			Object.getOwnPropertyNames(consoleStyles).forEach(styleName =>
				constyle.push(styleName + ':' + consoleStyles[styleName])
			)

			if (type != 'o' && styles.length && prevType != 'o')
				styles.push(`%${type}`)
			else
			{
				styles.push(`%c%${type}`)
				logParams.push(constyle.join(';'))
			}
			logParams.push(param)
			prevType = type
		})

		console.log_(styles.join(' '), ...logParams)
	}
})()