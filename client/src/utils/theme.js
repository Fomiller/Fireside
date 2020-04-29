import { createMuiTheme } from '@material-ui/core/styles';
import Dark from './DarkTheme.json';
import Light from './LightTheme.json';

import SynthWave from './theme_04.json'

 const DarkTheme = createMuiTheme(Dark);
 const LightTheme = createMuiTheme(Light);
 const SynthWaveTheme = createMuiTheme(SynthWave);

 export { DarkTheme, LightTheme, SynthWaveTheme };