const { override } = require('customize-cra');

module.exports = override(
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

