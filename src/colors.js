import * as Vibrant from '@akigami/vibrant';

export async function getColors(albumArt) {
    let vibrantHSL;
    let lightVibrantHSL;
    let darkVibrantHSL;
    let mutedHSL;
    let lightMutedHSL;
    let darkMutedHSL;

    let colorHSLMap = [6];

    let maxPop = 0;
    let mainColor;
    let secondaryColor;
    let gradientColor;

    let v = new Vibrant(albumArt);
    await v.getPalette().then(palette => {

        for (let swatch in palette) {
            //console.log(palette[swatch]);
            if (swatch === 'Vibrant') {
                vibrantHSL = palette[swatch]._hsl;
                colorHSLMap[0] = vibrantHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = vibrantHSL;
                }
            }
            else if (swatch === 'LightVibrant') {
                lightVibrantHSL = palette[swatch]._hsl;
                colorHSLMap[1] = lightVibrantHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = lightVibrantHSL;
                }

            }
            else if (swatch === 'DarkVibrant') {
                darkVibrantHSL = palette[swatch]._hsl;
                colorHSLMap[2] = darkVibrantHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = darkVibrantHSL;
                }

            }
            else if (swatch === 'Muted') {
                mutedHSL = palette[swatch]._hsl;
                colorHSLMap[3] = darkVibrantHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = mutedHSL;
                }

            }
            else if (swatch === 'LightMuted') {
                lightMutedHSL = palette[swatch]._hsl;
                colorHSLMap[4] = lightMutedHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = lightMutedHSL;
                }

            }
            else if (swatch === 'DarkMuted') {
                darkMutedHSL = palette[swatch]._hsl;
                colorHSLMap[5] = darkMutedHSL;
                if (palette[swatch]._population > maxPop) {
                    maxPop = palette[swatch]._population;
                    mainColor = darkMutedHSL;
                }

            }
        }
        console.log(mainColor);
        secondaryColor = getSecondaryColor(colorHSLMap, mainColor[2]);
        console.log(secondaryColor);
        gradientColor = getGradientColor(colorHSLMap, mainColor[0]);
        console.log(gradientColor);
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


        console.log(colorArray);
        return colorArray;
    });

}

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

function hslToHex(h ,s ,l){
    let rgb = Vibrant.Util.hslToRgb(h, s, l);
    let hex = Vibrant.Util.rgbToHex(rgb[0],rgb[1], rgb[2]);

    return hex;
}