import * as Vibrant from '@akigami/vibrant';
import { isNull } from 'util';

export async function getColors(albumArt) {

    //Array stores HSL Values
    let colorHSLArray = [];
    let colorArray = [];

    //Number stored is highest population of all evaluated swatches
    let maxPop = 0;

    //Store theme colors in HSL Array
    let mainColor;
    let secondaryColor;
    let gradientColor;

    //stores array with HSL values
    let swatchHSL;

    let v = new Vibrant(albumArt);

    //Promise returns a palette
    return await v.getPalette().then(palette => {

        //Iterate through palette and compare each type of swatch
        for (let swatch in palette) {
            //console.log(swatch, palette[swatch].getHex(), palette[swatch]._hsl);
            //in case the color swatch is null it will not be added to array
            if(palette[swatch] != null){
                if(palette[swatch]._hsl != null){
                    swatchHSL = palette[swatch]._hsl;
                    colorHSLArray.push(swatchHSL);
                    //Store population if larger than previous
                    if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = swatchHSL;
                    }
                }
                
            }
        }


        //call function to compute different colors

        secondaryColor = getSecondaryColor(colorHSLArray, mainColor[2]);
        gradientColor = getGradientColor(colorHSLArray, mainColor[0]);

        //convert all colors to hex from HSL
        colorArray = [hslToHex(
            mainColor[0],
            mainColor[1],
            mainColor[2]
        ), hslToHex(
            secondaryColor[0],
            secondaryColor[1],
            secondaryColor[2]
        ), hslToHex(
            gradientColor[0],
            gradientColor[1],
            gradientColor[2]

        )];


        //Return array of hex values
        //console.log(mainColor, secondaryColor)
        // console.log(colorArray)
        return colorArray;
    });

}

//Compares main color with all colors of array to evaluate highest luminous contrast
function getSecondaryColor(colorMap, mainLum) {

    //Minimum acceptable luminosity difference
    const minLumDiff = .35;

    //threshold that defines if color is dark or bright
    const thresh = .42;

    let maxLumDiff = 0;
    let secondarySwatch;
    for (let hsl of colorMap) {
        if (Math.abs(hsl[2] - mainLum) >= maxLumDiff) {
            maxLumDiff = Math.abs(hsl[2] - mainLum);
            secondarySwatch = hsl;
        }
    }
    
    if (maxLumDiff < minLumDiff){
        if(mainLum < thresh){
            secondarySwatch[2] += (minLumDiff - maxLumDiff);
        }
        else{
            secondarySwatch[2] -= (minLumDiff - maxLumDiff);
        }
    }
    
    return secondarySwatch;
};

//Compares main color with all colors of array to evaluate minimum difference in hue
function getGradientColor(colorMap, mainHue) {
    let minHueDiff = 1;
    let gradientSwatch;
    for (let hsl of colorMap) {
        if ((Math.abs(hsl[0] - mainHue) < minHueDiff)) {
            minHueDiff = hsl[0];
            gradientSwatch = hsl;
        }
    }
    return gradientSwatch;
}

//Vibrant lacks an hsl to hex conversion method, so hsl is converted hsl, then to hex.
function hslToHex(h ,s ,l){
    let rgb = Vibrant.Util.hslToRgb(h, s, l);
    let hex = Vibrant.Util.rgbToHex(rgb[0], rgb[1], rgb[2]);
    console.log(hex)
    return hex;
}