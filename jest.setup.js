const { gsap } = require('gsap');
const { ScrollTrigger } = require('gsap/');

gsap.registerPlugin(ScrollTrigger);

/* eslint-disable no-undef */
jest.mock('gsap/ScrollTrigger', () => ({
  create: jest.fn(),
  refresh: jest.fn(),
  kill: jest.fn()
}));
