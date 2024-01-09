import {createMatrix} from './createMatrix';
import {createPicture, rect, rrect, Skia} from '@shopify/react-native-skia';
import {type PathProps, type SkPicture} from '@shopify/react-native-skia';
import type {QRCodeErrorCorrectionLevel} from 'qrcode';
import getCorners from './getCorners';

type Neighbors = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

export type QrCodeSvgOptions = {
  value: string;
  frameSize: number;
  contentCells?: number;
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
  backgroundColor?: string;
  dotColor?: string;
  figurePathProps?: PathProps;
};

/* To sumarize I grabbed the code for QR Code svg rendering from react-native-qr-svg, however due to
/  my requirements, I had to convert the code into a function in order to obtain a skia picture for
/  better performance, as instructions are cached, fps go from 21 up to 60 with these call
/  replacements and  modifications.
/
/  If anyone is using this code aside from me, I make myself no responsible for any problems you may
/  encounter using such code as I do have no knowledge whatsoever about the qr code standarization.
*/
export const renderQrCode = ({
  value,
  frameSize,
  contentCells = 7,
  errorCorrectionLevel = 'M',
  dotColor = '#ffffff',
}: QrCodeSvgOptions): SkPicture => {
  return createPicture(rect(0, 0, frameSize, frameSize), canvas => {
    const qrColor = Skia.Color(dotColor);
    const paint = Skia.Paint();
    paint.setColor(qrColor);

    const originalMatrix = createMatrix(value, errorCorrectionLevel);

    const matrixCellSize =
      round((frameSize / originalMatrix.length) * 100) / 100;
    const matrixRowLength = originalMatrix[0]?.length ?? 0;
    const roundedContentCells =
      (matrixRowLength - contentCells) % 2 === 0
        ? contentCells
        : contentCells + 1;

    const contentStartIndex = (matrixRowLength - roundedContentCells) / 2;
    const contentEndIndex = contentStartIndex + roundedContentCells - 1;
    const contentXY = contentStartIndex * matrixCellSize;

    const matrix = originalMatrix.map((row, i) =>
      row.map((el, j) =>
        i >= contentStartIndex &&
        i <= contentEndIndex &&
        j >= contentStartIndex &&
        j <= contentEndIndex
          ? 0
          : el,
      ),
    );

    const renderFigure = (x: number, y: number, neighbors: Neighbors): void => {
      let {q1, q2, q3, q4} = getCorners(x, y, matrixCellSize);

      if (
        !(
          neighbors.top ||
          neighbors.right ||
          neighbors.bottom ||
          neighbors.left
        )
      ) {
        const radius = matrixCellSize / 2 / 4;
        canvas.drawRRect(
          rrect(rect(x, y, matrixCellSize, matrixCellSize), radius, radius),
          paint,
        );

        return;
      }

      // q4  0  d1  0  q1
      // 0   0  0   0  0
      // d4  0  0   0  d2
      // 0   0  0   0  0
      // q3  0  d3  0  q2
      const d1 = {
        x: x + matrixCellSize / 2,
        y: y,
      };
      const d2 = {
        x: x + matrixCellSize,
        y: y + matrixCellSize / 2,
      };
      const d1d2 =
        neighbors.top || neighbors.right
          ? `L${q1.x} ${q1.y} L${d2.x} ${d2.y}`
          : `Q${q1.x} ${q1.y} ${d2.x} ${d2.y}`;
      const d3 = {
        x: x + matrixCellSize / 2,
        y: y + matrixCellSize,
      };
      const d2d3 =
        neighbors.right || neighbors.bottom
          ? `L${q2.x} ${q2.y} L${d3.x} ${d3.y}`
          : `Q${q2.x} ${q2.y} ${d3.x} ${d3.y}`;
      const d4 = {
        x: x,
        y: y + matrixCellSize / 2,
      };
      const d3d4 =
        neighbors.bottom || neighbors.left
          ? `L${q3.x} ${q3.y} L${d4.x} ${d4.y}`
          : `Q${q3.x} ${q3.y} ${d4.x} ${d4.y}`;
      const d4d1 =
        neighbors.left || neighbors.top
          ? `L${q4.x} ${q4.y} L${d1.x} ${d1.y}`
          : `Q${q4.x} ${q4.y} ${d1.x} ${d1.y}`;
      const d = `M${d1.x} ${d1.y} ${d1d2} ${d2d3} ${d3d4} ${d4d1}`;

      const path = Skia.Path.MakeFromSVGString(d)!;
      canvas.drawPath(path, paint);
    };

    matrix.map((row, i) =>
      row.map((_, j) => {
        if (!row?.[j]) {
          return null;
        }
        const neighbors: Neighbors = {
          top: Boolean(matrix[i - 1]?.[j]),
          bottom: Boolean(matrix[i + 1]?.[j]),
          left: Boolean(row[j - 1]),
          right: Boolean(row[j + 1]),
        };
        const x = j * matrixCellSize;
        const y = i * matrixCellSize;
        renderFigure(x, y, neighbors);
      }),
    );

    canvas.drawCircle(
      contentXY + matrixCellSize * (contentCells / 2),
      contentXY + matrixCellSize * (contentCells / 2),
      matrixCellSize * (contentCells / 2 - 1),
      paint,
    );
  });
};

const round = (number: number) => Math.round(number * 100) / 100;
