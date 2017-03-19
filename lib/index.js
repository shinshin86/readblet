/**
  * convert to milliseconds
  * @param {string} Readable duration
  * @return {number} milliseconds
  */
module.exports.toMillisec = function (readableDuration) {
  var duration = readableDuration;

  try {
    var hours = duration.match(/^\d*:/).toString().substr(0, 2);
    var minutes = duration.match(/:\d*:/).toString().substr(1, 2);
    var milliseconds = duration.toString().substr(6);
  } catch (err) {
    throw new Error('Argument error : Argument is must be readable time => For example "10:10:10.01');
  }

  if (isFinite(hours) &&
     isFinite(minutes) &&
     isFinite(milliseconds) === false) {
    throw new Error('Argument error : Argument is must be readable time => For example "10:10:10.01');
  }

  if (minutes >= 61 || milliseconds >= 61) {
    throw new Error('Argument error : Argument is must be readable time => For example "10:10:10.01');
  }

  var answer = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseFloat(milliseconds);
  return answer;
};

/** convert to readable duration
  * @param {number} milliseconds
  * @return {string} readbale duration
  */
module.exports.toReadable = function (argMillisec) {
  var time = argMillisec.toString();
  var  m = '';
  var seconds = '00';
  var milliseconds = '00';

  if (time.indexOf('.') !== -1) {
    if (time.indexOf('.') === 1) {
      m = time.match(/\d\.\d*/).toString();
      seconds = m.substr(0, 1);
      milliseconds = m.substr(1, 3);

      if (parseInt(seconds) >= 60) {
        seconds = convSeconds_(argMillisec).toString();
      }
    } else if (time.indexOf('.') >= 2) {
      m = time.match(/\d{2}\.\d*/).toString();
      seconds = m.substr(0, 2);
      milliseconds = m.substr(2, 3);

      if (parseInt(seconds) >= 60) {
        seconds = convSeconds_(seconds).toString();
      }
    } else {
      throw new Error('Argument error : The corresponding decimal point is "0.01"');
    }
  } else {
    seconds = time.toString().substr(-2, 2);
    if (parseInt(seconds) >= 60) {
      seconds = convSeconds_(argMillisec).toString();
    }
  }

  var hours = parseInt(argMillisec / 3600);
  var minutes = parseInt((argMillisec % 3600) / 60);
  var result = '';

  hours > 0 ? result += (('0'+hours).slice(-2)) + ':' : result += '00:';
  minutes > 0 ? result += (('0'+minutes).slice(-2)) + ':' : result += '00:';
  seconds > 0 ? result += (('0'+seconds).slice(-2)) : result += '00';

  if (milliseconds === '00') {
    return result.trim();
  }
  if (milliseconds.indexOf('.') === 0) {
    result += milliseconds;
  } else {
    result += '.';
    result += (('0'+milliseconds).slice(-2));
  }
  return result.trim();
};

/**
 * Convert to seconds
 * @param {number} Number of seconds that exceeds 60 seconds
 * @return {number} seconds
 */
function convSeconds_(sec) {
  return sec - 60;
}
