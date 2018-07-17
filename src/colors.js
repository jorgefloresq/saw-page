import * as Vibrant from '@akigami/vibrant';

export async function getColors(albumArt) {
    //initialize variables which store arrays with HSL Values
    let vibrantHSL;
    let lightVibrantHSL;
    let darkVibrantHSL;
    let mutedHSL;
    let lightMutedHSL;
    let darkMutedHSL;

    //Array stores HSL Values
    let colorHSLArray = [6];

    //Number stored is highest population of all evaluated swatches
    let maxPop = 0;

    //Store theme colors in HSL Array
    let mainColor;
    let secondaryColor;
    let gradientColor;

    let v = new Vibrant(albumArt);

    //Promise returns a palette
    await v.getPalette().then(palette => {

        //Iterate through palette and compare each type of swatch
        for (let swatch in palette) {

            if (swatch === 'Vibrant') {
                vibrantHSL = palette[swatch]._hsl;
                colorHSLArray[0] = vibrantHSL;

                //Store population if larger than previous
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = vibrantHSL;
                }
            }
            else if (swatch === 'LightVibrant') {
                lightVibrantHSL = palette[swatch]._hsl;
                colorHSLArray[1] = lightVibrantHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = lightVibrantHSL;
                }

            }
            else if (swatch === 'DarkVibrant') {
                darkVibrantHSL = palette[swatch]._hsl;
                colorHSLArray[2] = darkVibrantHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = darkVibrantHSL;
                }

            }
            else if (swatch === 'Muted') {
                mutedHSL = palette[swatch]._hsl;
                colorHSLArray[3] = darkVibrantHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = mutedHSL;
                }

            }
            else if (swatch === 'LightMuted') {
                lightMutedHSL = palette[swatch]._hsl;
                colorHSLArray[4] = lightMutedHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = lightMutedHSL;
                }

            }
            else if (swatch === 'DarkMuted') {
                darkMutedHSL = palette[swatch]._hsl;
                colorHSLArray[5] = darkMutedHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = darkMutedHSL;
                }
            }
        }
        //call function to compute different colors
        secondaryColor = getSecondaryColor(colorHSLArray, mainColor[2]);
        gradientColor = getGradientColor(colorHSLArray, mainColor[0]);

        //convert all colors to hex from HSL
        let colorArray = [hslToHex(
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
        return colorArray;
    });

}

//Compares main color with all colors of array to evaluate highest luminous contrast
function getSecondaryColor(colorMap, mainLum) {
    let maxLumDiff = 0;
    let secondarySwatch;
    for (let hsl of colorMap) {
        if (Math.abs(hsl[2] - mainLum) > maxLumDiff) {
            maxLumDiff = hsl[2];
            secondarySwatch = hsl;
        }
    }
    return secondarySwatch;
};

//Compares main color with all colors of array to evaluate minimum difference in hue
function getGradientColor(colorMap, mainHue) {
    let minHueDiff = 1;
    let gradientSwatch;
    for (let hsl of colorMap) {
        if ((Math.abs(hsl[0] - mainHue) < minHueDiff) && mainHue != hsl[0]) {
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

    return hex;
}