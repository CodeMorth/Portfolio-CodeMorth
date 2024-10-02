/**
 * Calculates the position of circles based on the device type.
 *
 * This function returns a specific value from the `desktopValues` array 
 * depending on whether the device is a mobile, tablet, or desktop.
 *
 * @param {boolean} movile - A boolean indicating if the device is mobile.
 * @param {boolean} tablet - A boolean indicating if the device is a tablet.
 * @param {number[]} desktopValues - An array containing position values for desktop,
 *                                    where:
 *                                    - desktopValues[0] is used for mobile devices,
 *                                    - desktopValues[1] is used for tablets,
 *                                    - desktopValues[2] is used for desktop devices.
 * @returns {number} - The calculated position value based on the device type.
 */
export const calculatePositionsCircles = (movile: boolean, tablet: boolean, desktopValues: number[]) => {
  return movile ? desktopValues[0] : tablet ? desktopValues[1] : desktopValues[2];
};
