import { createMuiTheme } from '@material-ui/core/styles';
import Dark from './DarkTheme.json';
import Light from './LightTheme.json';

 const DarkTheme = createMuiTheme(Dark);
 const LightTheme = createMuiTheme(Light);

 export { DarkTheme, LightTheme };