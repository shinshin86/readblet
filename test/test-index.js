var chai = require('chai');
var expect = chai.expect;
var readblet = require('../lib/index.js');

describe('toMillisec function', function(){
  it('Convert readable time to millisec : 01:00:00 => 3600', function() {
    var result = readblet.toMillisec('01:00:00');
    var millisec = 3600;
    expect(millisec).to.equal(result);
  });
  it('Convert readable time to millisec : 00:01:00 => 60', function() {
    var result = readblet.toMillisec('00:01:00');
    var millisec = 60;
    expect(millisec).to.equal(result);
  });
  it('Convert readable time to millisec : 00:00:01 => 1', function() {
    var result = readblet.toMillisec('00:00:01');
    var millisec = 1;
    expect(millisec).to.equal(result);
  });
  it('Convert readable time to millisec : 00:00:00.1 => 0.1', function() {
    var result = readblet.toMillisec('00:00:00.1');
    var millisec = 0.1;
    expect(millisec).to.equal(result);
  });
  it('Convert readable time to millisec : 00:00:00.01 => 0.01', function() {
    var result = readblet.toMillisec('00:00:00.01');
    var millisec = 0.01;
    expect(millisec).to.equal(result);
  });
  it('Convert readable time to millisec : 01:01:01.16 => 3661.16', function() {
    var result = readblet.toMillisec('01:01:01.16');
    var millisec = 3661.16;
    expect(millisec).to.equal(result);
  });
  it('Convert readable time to millisec : 00:00:00.99 => 0.99', function() {
    var result = readblet.toMillisec('00:00:00.99');
    var millisec = 0.99;
    expect(millisec).to.equal(result);
  });
  it('When put argument of 61:00:00 then not throw exception', function() {
    var result = readblet.toMillisec('61:00:00');
    var millisec = 219600;
    expect(millisec).to.equal(result);
  });
  it('When put argument of 00:61:00 then throe exception', function() {
    expect(function(){readblet.toMillisec('00:61:00')}).to.throw(Error);
  });
  it('When put argument of 00:00:61 then throe exception', function() {
    expect(function(){readblet.toMillisec('00:00:61')}).to.throw(Error);
  });
  it('For unexpected arguments, TypeError is returned', function() {
    expect(function(){readblet.toMillisec('000000')}).to.throw(Error);
    expect(function(){readblet.toMillisec('test')}).to.throw(Error);
    expect(function(){readblet.toMillisec('01:0101')}).to.throw(Error);
    expect(function(){readblet.toMillisec('0101:01')}).to.throw(Error);
    expect(function(){readblet.toMillisec('01:0101.01')}).to.throw(Error);
    expect(function(){readblet.toMillisec('0101:01.11')}).to.throw(Error);
    expect(function(){readblet.toMillisec('010101.11')}).to.throw(Error);
  });
});

describe('toReadable function', function(){
  it('3600 => 01:00:00', function() {
    var result = readblet.toReadable(3600);
    var readableTime = '01:00:00';
    expect(readableTime).to.equal(result);
  });
  it('60 => 00:01:00', function() {
    var result = readblet.toReadable(60);
    var readableTime = '00:01:00';
    expect(readableTime).to.equal(result);
  });
  it('1 => 00:00:01', function() {
    var result = readblet.toReadable(1);
    var readableTime = '00:00:01';
    expect(readableTime).to.equal(result);
  });
  it('0.1 => 00:00:00.1', function() {
    var result = readblet.toReadable(0.1);
    var readableTime = '00:00:00.1';
    expect(readableTime).to.equal(result);
  });
  it('0.01 => 00:00:00.01', function() {
    var result = readblet.toReadable(0.01);
    var readableTime = '00:00:00.01';
    expect(readableTime).to.equal(result);
  });
  it('3661.16 => 01:01:01.16', function() {
    var result = readblet.toReadable(3661.16);
    var readableTime = '01:01:01.16';
    expect(readableTime).to.equal(result);
  });
  it('0.99 => 00:00:00.99', function() {
    var result = readblet.toReadable(0.99);
    var readableTime = '00:00:00.99';
    expect(readableTime).to.equal(result);
  });
  it('219600 => 61:00:00', function() {
    var result = readblet.toReadable(219600);
    var readableTime = '61:00:00';
    expect(readableTime).to.equal(result);
  });
  it('3660 => 01:01:00', function() {
    var result = readblet.toReadable(3660);
    var readableTime = '01:01:00';
    expect(readableTime).to.equal(result);
  });
  it('61 => 00:01:01', function() {
    var result = readblet.toReadable(61);
    var readableTime = '00:01:01';
    expect(readableTime).to.equal(result);
  });
  it('0.61 => 00:00:00.61', function() {
    var result = readblet.toReadable(0.61);
    var readableTime = '00:00:00.61';
    expect(readableTime).to.equal(result);
  });
});
