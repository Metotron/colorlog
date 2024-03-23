(function() {
	const consoleStyles = [
		'font-size: 14px',
		'padding: 2px 5px',
		'color: #499e4b'
	].join(';')

	const floatPrecision = 0        // Количество знаков после запятой для дробных чисел. 0 — вывод строкой

	console.log_ = console.log

	console.log = (...params) => {
		const styles    = [],    // Стили для вывода
		      logParams = []     // Параметры для console.log

		params.forEach(param => {
			let type = 's'

			switch (typeof(param)) {
				case 'object':
					type = 'o'
					break

				case 'number':
					if (param % 1 == 0)
						type = 'd'
					else if (floatPrecision != 0)
						type = `.${floatPrecision}f`
					break
			}

			// Если перед этим выводили не объект, то стили заново вставлять не нужно, они ещё действуют
			if (type != 'o' && styles.length && styles[styles.length - 1] != '%c%o') {
				styles.push(`%${type}`)
			}
			else {
				styles.push(`%c%${type}`)
				logParams.push(consoleStyles)
			}

			logParams.push(param)
		})

		console.log_(styles.join(' '), ...logParams)
	}
})()
