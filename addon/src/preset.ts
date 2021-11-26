export function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

export async function webpackFinal(config: any, { presets }: any) {
  const version = await presets.apply('webpackVersion');

  if (version === '5') {
    config.module.rules = config.module.rules.map((rule: any) =>
      rule.test.toString().includes('.css') ||
      rule.test.toString().includes('.less') ||
      rule.test.toString().includes('.scss') ||
      rule.test.toString().includes('.svg')
        ? { ...rule, resourceQuery: { not: [/raw/] } }
        : rule
    );

    config.module.rules.push({
      test: /\.(css|less|scss|svg)$/,
      resourceQuery: /raw/,
      type: 'asset/source'
    });
  }

  return config;
}
