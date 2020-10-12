function buildDataSet(data) {
  const _types = data.pokemonTypes.split(',');
  const _resistant = data.pokemonResistance.split(',');
  const _weaknesses = data.pokemonWeaknesses.split(',');

  const _fastAttacks = data.pokemonFastAttacks.split(',');
  const _fastAttacksFinal = _fastAttacks.map(x => x.split('-'));
  const _dsFastAtttacks = _fastAttacksFinal.map(x => {
    return {
      Name: x[0],
      Type: x[1],
      Damage: x[2],
    };
  });

  const _specialAttacks = data.pokemonSpecialAttacks.split(',');
  const _specialAttacksFinal = _specialAttacks.map(x => x.split('-'));
  const _dsSpecialAtttacks = _specialAttacksFinal.map(x => {
    return {
      Name: x[0],
      Type: x[1],
      Damage: x[2],
    };
  });

  const _pokemonPreviousEvolutions =
    data.pokemonPreviousEvolutions !== ''
      ? data.pokemonPreviousEvolutions.split(',')
      : undefined;

  const _pokemonPreviousEvolutionsFinal =
    _pokemonPreviousEvolutions &&
    _pokemonPreviousEvolutions.map(x => x.split('-'));

  const _dsPreviousEvolution =
    _pokemonPreviousEvolutionsFinal &&
    _pokemonPreviousEvolutionsFinal.map(x => {
      return {
        Number: x[0],
        Name: x[1],
      };
    });

  const _pokemonEvolutions =
    data.pokemonEvolutions !== ''
      ? data.pokemonEvolutions.split(',')
      : undefined;

  const _pokemonEvolutionsFinal =
    _pokemonEvolutions && _pokemonEvolutions.map(x => x.split('-'));

  const _dsPokemonEvolutions =
    _pokemonEvolutionsFinal &&
    _pokemonEvolutionsFinal.map(x => {
      return {
        Number: x[0],
        Name: x[1],
      };
    });

  const _dsNextEvolutionReq =
    data.pokemonNextEvolution !== ''
      ? data.pokemonNextEvolution.split('-')
      : undefined;

  const _dsNextEvolutionReqFinal = _dsNextEvolutionReq && {
    Amount: _dsNextEvolutionReq[0],
    Name: _dsNextEvolutionReq[1],
  };

  const Weight = {
    Minimum: data.pokemonMinWeight,
    Maximum: data.pokemonMaxWeight,
  };

  const Height = {
    Minimum: data.pokemonMinHeight,
    Maximum: data.pokemonMaxHeight,
  };

  const ds = {
    Number: data.pokemonNumber,
    Name: data.pokemonName,
    Generation: data.pokemonGeneration,
    About: data.pokemonDescription,
    Types: _types,
    Resistant: _resistant,
    Weaknesses: _weaknesses,
    'Fast Attack(s)': _dsFastAtttacks,
    'Special Attack(s)': _dsSpecialAtttacks,
    Weight,
    Height,
    'Buddy Distance': data.pokemonDistance,
    'Base Stamina': data.pokemonBaseStamina,
    'Base Attack': data.pokemonBaseAttack,
    'Base Defense': data.pokemonBaseDefense,
    'Base Flee Rate': data.pokemonFleeRate,
    'Next Evolution Requirements': _dsNextEvolutionReqFinal,
    'Next evolution(s)': _dsPokemonEvolutions,
    'Previous evolution(s)': _dsPreviousEvolution,
    MaxCP: data.pokemonMaxCP,
    MaxHP: data.pokemonMaxHP,
  };

  return ds;
}

function handleDispatchEvents(pokemonId) {
  if (!pokemonId) return;

  const event = new Event('focus');
  const pokemonNumberEl = document.getElementById('pokemonNumber');
  pokemonNumberEl.dispatchEvent(event);
  const pokemonNameEl = document.getElementById('pokemonName');
  pokemonNameEl.dispatchEvent(event);
  const pokemonGenerationEl = document.getElementById('pokemonGeneration');
  pokemonGenerationEl.dispatchEvent(event);
  const pokemonDescriptionEl = document.getElementById('pokemonDescription');
  pokemonDescriptionEl.dispatchEvent(event);
  const pokemonTypesEl = document.getElementById('pokemonTypes');
  pokemonTypesEl.dispatchEvent(event);
  const pokemonResistanceEl = document.getElementById('pokemonResistance');
  pokemonResistanceEl.dispatchEvent(event);
  const pokemonWeaknessesEl = document.getElementById('pokemonWeaknesses');
  pokemonWeaknessesEl.dispatchEvent(event);
  const pokemonFastAttacksEl = document.getElementById('pokemonFastAttacks');
  pokemonFastAttacksEl.dispatchEvent(event);
  const pokemonSpecialAttacksEl = document.getElementById(
    'pokemonSpecialAttacks'
  );
  pokemonSpecialAttacksEl.dispatchEvent(event);
  const pokemonMinWeightEl = document.getElementById('pokemonMinWeight');
  pokemonMinWeightEl.dispatchEvent(event);
  const pokemonMaxWeightEl = document.getElementById('pokemonMaxWeight');
  pokemonMaxWeightEl.dispatchEvent(event);
  const pokemonMinHeightEl = document.getElementById('pokemonMinHeight');
  pokemonMinHeightEl.dispatchEvent(event);
  const pokemonMaxHeightEl = document.getElementById('pokemonMaxHeight');
  pokemonMaxHeightEl.dispatchEvent(event);
  const pokemonDistanceEl = document.getElementById('pokemonDistance');
  pokemonDistanceEl.dispatchEvent(event);
  const pokemonBaseStaminaEl = document.getElementById('pokemonBaseStamina');
  pokemonBaseStaminaEl.dispatchEvent(event);
  const pokemonBaseAttackEl = document.getElementById('pokemonBaseAttack');
  pokemonBaseAttackEl.dispatchEvent(event);
  const pokemonBaseDefenseEl = document.getElementById('pokemonBaseDefense');
  pokemonBaseDefenseEl.dispatchEvent(event);
  const pokemonFleeRateEl = document.getElementById('pokemonFleeRate');
  pokemonFleeRateEl.dispatchEvent(event);
  const pokemonNextEvolutionEl = document.getElementById(
    'pokemonNextEvolution'
  );
  pokemonNextEvolutionEl.dispatchEvent(event);
  const pokemonEvolutionsEl = document.getElementById('pokemonEvolutions');
  pokemonEvolutionsEl.dispatchEvent(event);
  const pokemonPreviousEvolutionsEl = document.getElementById(
    'pokemonPreviousEvolutions'
  );
  pokemonPreviousEvolutionsEl.dispatchEvent(event);
  const pokemonMaxCPEl = document.getElementById('pokemonMaxCP');
  pokemonMaxCPEl.dispatchEvent(event);
  const pokemonMaxHPEl = document.getElementById('pokemonMaxHP');
  pokemonMaxHPEl.dispatchEvent(event);
}

export { buildDataSet, handleDispatchEvents };
