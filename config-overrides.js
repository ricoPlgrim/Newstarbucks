const { override } = require('customize-cra');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// 빌드 시간 측정 플러그인 (환경 변수로 제어)
const shouldAnalyze = process.env.ANALYZE_BUILD === 'true';
const smp = shouldAnalyze
  ? new SpeedMeasurePlugin({
      outputFormat: 'human', // 'human' | 'json' | 'humanVerbose'
      loaderTopFiles: 10, // 가장 오래 걸리는 로더 상위 10개 표시
    })
  : null;

const webpackConfig = override(
  (config) => {
    // webpack의 ignoreWarnings 옵션 추가 - Sass deprecation 경고 필터링
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      // Sass deprecation 경고 필터링 (정규식으로 다양한 패턴 매칭)
      /legacy JS API/,
      /Deprecation.*legacy/,
      /The legacy JS API is deprecated/,
      {
        module: /sass-loader/,
      },
      (warning) => {
        // 모든 sass-loader 관련 경고 필터링
        if (warning && warning.message) {
          const message = warning.message.toString();
          if (
            message.includes('legacy JS API') ||
            message.includes('Deprecation') ||
            message.includes('Dart Sass 2.0.0')
          ) {
            return false; // 경고를 숨김
          }
        }
        return true;
      },
    ];

    // sass-loader 옵션 수정
    const rules = config.module.rules;
    if (rules) {
      rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((oneOf) => {
            if (oneOf.use && Array.isArray(oneOf.use)) {
              oneOf.use.forEach((use) => {
                if (use.loader && typeof use.loader === 'string' && use.loader.includes('sass-loader')) {
                  use.options = {
                    ...(use.options || {}),
                    sassOptions: {
                      ...(use.options?.sassOptions || {}),
                      silenceDeprecations: ['legacy-js-api'],
                    },
                    // 추가 옵션으로 경고 억제
                    warnRuleAsWarning: false,
                  };
                }
              });
            }
          });
        }
      });
    }

    // webpack stats 설정으로 경고 필터링
    if (config.stats) {
      config.stats.warningsFilter = [
        ...(config.stats.warningsFilter || []),
        /legacy JS API/,
        /Deprecation/,
      ];
    } else {
      config.stats = {
        warningsFilter: [
          /legacy JS API/,
          /Deprecation/,
        ],
      };
    }

    return config;
  }
);

// 빌드 시간 분석이 활성화된 경우에만 래핑
module.exports = shouldAnalyze && smp ? smp.wrap(webpackConfig) : webpackConfig;

