export const SHADER_SOURCE = `
  uniform float width;
  uniform float height;
  uniform float angle;

  uniform float progress;

  uniform vec2 center;

  uniform vec3 from1;
  uniform vec3 from2;
  uniform vec3 from3;
  uniform vec3 from4;

  uniform vec3 to1;
  uniform vec3 to2;
  uniform vec3 to3;
  uniform vec3 to4;

  mat2 rotationMatrix(float angle) {
    return mat2(
      cos(angle), -1.0 * sin(angle),
      sin(angle), cos(angle)
    );
  }

  float gradient(float start, float end, float coordinate) {
    float gap = end - start;
    if(coordinate >= start && coordinate <= end) {
        return 1.0 - (coordinate - start) / gap;
    }
    
    if(coordinate >= end) {
        return 0.0;
    }
    
    return 1.0;
  }

  vec4 main(vec2 pos) {
    vec2 st = pos / vec2(width, height);

    st -= center;
    st *= rotationMatrix(angle);
    st += center;

    vec3 color1 = mix(from1, to1, progress);
    vec3 color2 = mix(from2, to2, progress);
    vec3 color3 = mix(from3, to3, progress);
    vec3 color4 = mix(from4, to4, progress);
    
    float gradientX = gradient(0.25, 0.75, st.x);
    vec3 halfOne = mix(color2, color1, gradientX);
    vec3 halfTwo = mix(color4, color3, gradientX);
    
    vec3 final = mix(halfTwo, halfOne, gradient(0.25, 0.75, st.y));
    return vec4(final, 1.0);
  }
`;
