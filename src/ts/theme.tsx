const commonBrandColors = {
  successColor: '#00d624',
  errorColor: '#bd2c00',
  warningColor: '#c9510c',
  infoColor: '#63c0df',
};

const purples = {
  purple: '#620CE3',
  purpleHover: '#6936CF',
  purpleDarker: '#3C138F',
  purpleDisabled: '#272727',
};

const yellows = {
  yellow: '#FCAE00',
  yellowHover: '#FBB926',
  yellowDarker: '#F5A623',
  yellowDisabled: '#FBF0B3',
};

const greys = {
  trueBlack: '#000000',
  offBlack: '#222222',
  darkGrey: '#333333',
  mediumGrey: '#666666',
  lightGrey: '#999999',
  offWhite: '#f5f5f5',
  trueWhite: '#ffffff',
};

const greens = {
  green: '#2ACA4B',
  greenHover: '#199E33',
  greenDarker: '#006607',
  greenDisabled: '#94E4A5',
};

const mints = {
  mint: '#159F84',
  mintHover: '#0B856D',
  mintDarker: '#045943',
  mintDisabled: '#8ACFC1',
};

const blues = {
  blue: '#007FFF',
  blueHover: '#0066CC',
  blueDarker: '#003E83',
  blueDisabled: '#7FBFFF',
};

const reds = {
  red: '#D8524E',
  redHover: '#B33C38',
  redDarker: '#A52724',
  redDisabled: '#EBA8A6',
};

const colors = {
  ...commonBrandColors,
  ...purples,
  ...yellows,
  ...greys,
  ...greens,
  ...mints,
  ...blues,
  ...reds,
};

const applicationTheme = {
  global: {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    colors: { ...colors },
    font: {
      family: 'Source Code Pro',
      height: '1.5rem',
      size: '1rem',
      weight: 400,
    },
  },
  button: {
    active: {
      color: colors.trueWhite,
      border: {
        radius: '0.5rem',
        width: '1px',
      },
    },
    border: {
      radius: '0.5rem',
      width: '1px',
    },
    hover: {
      boxShadow: 'none',
      border: {
        radius: '0.5rem',
        width: '1px',
      },
    },
    transition: {
      properties: ['box-shadow'],
    },
  },
};

export default applicationTheme;
