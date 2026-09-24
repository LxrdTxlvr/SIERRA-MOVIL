import { Coordinate } from '../types/transport';

/**
 * Carreteras Reales de la Sierra Gorda y conexiones interestatales.
 * Generadas utilizando la API de Enrutamiento (OSRM / OpenStreetMap) siguiendo con precisión milimétrica
 * el trazo asfáltico oficial de las Carreteras Federales Mex 120 y Mex 69, evitando cortes sobre cerros.
 */

// 1. Carretera Federal 120: Jalpan de Serra <-> Xilitla (271 puntos)
export const REAL_JALPAN_XILITLA_HIGHWAY: Coordinate[] = [
  {
    "latitude": 21.21721,
    "longitude": -99.47075
  },
  {
    "latitude": 21.21688,
    "longitude": -99.4714
  },
  {
    "latitude": 21.21644,
    "longitude": -99.47133
  },
  {
    "latitude": 21.21587,
    "longitude": -99.47191
  },
  {
    "latitude": 21.21433,
    "longitude": -99.47127
  },
  {
    "latitude": 21.21454,
    "longitude": -99.46904
  },
  {
    "latitude": 21.21589,
    "longitude": -99.46755
  },
  {
    "latitude": 21.21579,
    "longitude": -99.46452
  },
  {
    "latitude": 21.21234,
    "longitude": -99.45714
  },
  {
    "latitude": 21.21029,
    "longitude": -99.45484
  },
  {
    "latitude": 21.20672,
    "longitude": -99.45232
  },
  {
    "latitude": 21.20347,
    "longitude": -99.44929
  },
  {
    "latitude": 21.20045,
    "longitude": -99.44736
  },
  {
    "latitude": 21.19909,
    "longitude": -99.44514
  },
  {
    "latitude": 21.19677,
    "longitude": -99.44521
  },
  {
    "latitude": 21.19618,
    "longitude": -99.44335
  },
  {
    "latitude": 21.19493,
    "longitude": -99.44168
  },
  {
    "latitude": 21.19376,
    "longitude": -99.44148
  },
  {
    "latitude": 21.1919,
    "longitude": -99.44323
  },
  {
    "latitude": 21.18944,
    "longitude": -99.44334
  },
  {
    "latitude": 21.17898,
    "longitude": -99.44045
  },
  {
    "latitude": 21.17805,
    "longitude": -99.4395
  },
  {
    "latitude": 21.17802,
    "longitude": -99.4349
  },
  {
    "latitude": 21.17482,
    "longitude": -99.42495
  },
  {
    "latitude": 21.17556,
    "longitude": -99.41777
  },
  {
    "latitude": 21.17268,
    "longitude": -99.41067
  },
  {
    "latitude": 21.16973,
    "longitude": -99.40564
  },
  {
    "latitude": 21.16559,
    "longitude": -99.39391
  },
  {
    "latitude": 21.16554,
    "longitude": -99.39069
  },
  {
    "latitude": 21.16733,
    "longitude": -99.3882
  },
  {
    "latitude": 21.16856,
    "longitude": -99.38174
  },
  {
    "latitude": 21.16689,
    "longitude": -99.37751
  },
  {
    "latitude": 21.16583,
    "longitude": -99.37604
  },
  {
    "latitude": 21.1656,
    "longitude": -99.37301
  },
  {
    "latitude": 21.16594,
    "longitude": -99.37193
  },
  {
    "latitude": 21.16508,
    "longitude": -99.37039
  },
  {
    "latitude": 21.16487,
    "longitude": -99.36871
  },
  {
    "latitude": 21.16392,
    "longitude": -99.3674
  },
  {
    "latitude": 21.16482,
    "longitude": -99.36624
  },
  {
    "latitude": 21.16432,
    "longitude": -99.3653
  },
  {
    "latitude": 21.16452,
    "longitude": -99.3642
  },
  {
    "latitude": 21.16328,
    "longitude": -99.36292
  },
  {
    "latitude": 21.16306,
    "longitude": -99.3621
  },
  {
    "latitude": 21.16341,
    "longitude": -99.36078
  },
  {
    "latitude": 21.16444,
    "longitude": -99.35991
  },
  {
    "latitude": 21.1649,
    "longitude": -99.35885
  },
  {
    "latitude": 21.16544,
    "longitude": -99.35599
  },
  {
    "latitude": 21.16693,
    "longitude": -99.35545
  },
  {
    "latitude": 21.16722,
    "longitude": -99.35398
  },
  {
    "latitude": 21.16851,
    "longitude": -99.35368
  },
  {
    "latitude": 21.16894,
    "longitude": -99.35312
  },
  {
    "latitude": 21.16803,
    "longitude": -99.34949
  },
  {
    "latitude": 21.16909,
    "longitude": -99.3476
  },
  {
    "latitude": 21.16956,
    "longitude": -99.34134
  },
  {
    "latitude": 21.17141,
    "longitude": -99.33034
  },
  {
    "latitude": 21.17283,
    "longitude": -99.32769
  },
  {
    "latitude": 21.17529,
    "longitude": -99.32792
  },
  {
    "latitude": 21.176,
    "longitude": -99.32703
  },
  {
    "latitude": 21.17682,
    "longitude": -99.32675
  },
  {
    "latitude": 21.17657,
    "longitude": -99.32561
  },
  {
    "latitude": 21.17696,
    "longitude": -99.32462
  },
  {
    "latitude": 21.17834,
    "longitude": -99.32481
  },
  {
    "latitude": 21.17896,
    "longitude": -99.32556
  },
  {
    "latitude": 21.17943,
    "longitude": -99.32558
  },
  {
    "latitude": 21.17972,
    "longitude": -99.32435
  },
  {
    "latitude": 21.17857,
    "longitude": -99.32317
  },
  {
    "latitude": 21.17856,
    "longitude": -99.32269
  },
  {
    "latitude": 21.18017,
    "longitude": -99.32209
  },
  {
    "latitude": 21.18279,
    "longitude": -99.32019
  },
  {
    "latitude": 21.18502,
    "longitude": -99.32044
  },
  {
    "latitude": 21.18494,
    "longitude": -99.32201
  },
  {
    "latitude": 21.18652,
    "longitude": -99.32221
  },
  {
    "latitude": 21.18671,
    "longitude": -99.32133
  },
  {
    "latitude": 21.18823,
    "longitude": -99.32136
  },
  {
    "latitude": 21.18835,
    "longitude": -99.32076
  },
  {
    "latitude": 21.18386,
    "longitude": -99.32032
  },
  {
    "latitude": 21.18395,
    "longitude": -99.31933
  },
  {
    "latitude": 21.18497,
    "longitude": -99.31821
  },
  {
    "latitude": 21.19084,
    "longitude": -99.29888
  },
  {
    "latitude": 21.19645,
    "longitude": -99.29056
  },
  {
    "latitude": 21.22199,
    "longitude": -99.27937
  },
  {
    "latitude": 21.22352,
    "longitude": -99.27913
  },
  {
    "latitude": 21.22698,
    "longitude": -99.27966
  },
  {
    "latitude": 21.2296,
    "longitude": -99.27843
  },
  {
    "latitude": 21.23045,
    "longitude": -99.27753
  },
  {
    "latitude": 21.23083,
    "longitude": -99.27521
  },
  {
    "latitude": 21.23142,
    "longitude": -99.27414
  },
  {
    "latitude": 21.24056,
    "longitude": -99.26699
  },
  {
    "latitude": 21.24391,
    "longitude": -99.26207
  },
  {
    "latitude": 21.25888,
    "longitude": -99.25165
  },
  {
    "latitude": 21.26092,
    "longitude": -99.25118
  },
  {
    "latitude": 21.26455,
    "longitude": -99.25161
  },
  {
    "latitude": 21.26899,
    "longitude": -99.24948
  },
  {
    "latitude": 21.28075,
    "longitude": -99.24903
  },
  {
    "latitude": 21.2818,
    "longitude": -99.24846
  },
  {
    "latitude": 21.28307,
    "longitude": -99.24411
  },
  {
    "latitude": 21.28311,
    "longitude": -99.24164
  },
  {
    "latitude": 21.2811,
    "longitude": -99.23185
  },
  {
    "latitude": 21.28125,
    "longitude": -99.22879
  },
  {
    "latitude": 21.28024,
    "longitude": -99.22569
  },
  {
    "latitude": 21.28022,
    "longitude": -99.22416
  },
  {
    "latitude": 21.28081,
    "longitude": -99.22391
  },
  {
    "latitude": 21.28303,
    "longitude": -99.22558
  },
  {
    "latitude": 21.28467,
    "longitude": -99.225
  },
  {
    "latitude": 21.2849,
    "longitude": -99.22324
  },
  {
    "latitude": 21.2868,
    "longitude": -99.22248
  },
  {
    "latitude": 21.28732,
    "longitude": -99.2218
  },
  {
    "latitude": 21.28743,
    "longitude": -99.22057
  },
  {
    "latitude": 21.28676,
    "longitude": -99.21837
  },
  {
    "latitude": 21.28736,
    "longitude": -99.21804
  },
  {
    "latitude": 21.28885,
    "longitude": -99.21833
  },
  {
    "latitude": 21.28971,
    "longitude": -99.21795
  },
  {
    "latitude": 21.29084,
    "longitude": -99.21529
  },
  {
    "latitude": 21.29135,
    "longitude": -99.21271
  },
  {
    "latitude": 21.28914,
    "longitude": -99.21027
  },
  {
    "latitude": 21.28844,
    "longitude": -99.20891
  },
  {
    "latitude": 21.28738,
    "longitude": -99.20885
  },
  {
    "latitude": 21.28538,
    "longitude": -99.20781
  },
  {
    "latitude": 21.28303,
    "longitude": -99.20865
  },
  {
    "latitude": 21.28157,
    "longitude": -99.20985
  },
  {
    "latitude": 21.27952,
    "longitude": -99.21255
  },
  {
    "latitude": 21.27834,
    "longitude": -99.21338
  },
  {
    "latitude": 21.27608,
    "longitude": -99.21442
  },
  {
    "latitude": 21.27391,
    "longitude": -99.21442
  },
  {
    "latitude": 21.27378,
    "longitude": -99.21392
  },
  {
    "latitude": 21.27429,
    "longitude": -99.21319
  },
  {
    "latitude": 21.27555,
    "longitude": -99.2129
  },
  {
    "latitude": 21.27698,
    "longitude": -99.21145
  },
  {
    "latitude": 21.27789,
    "longitude": -99.20933
  },
  {
    "latitude": 21.27769,
    "longitude": -99.20754
  },
  {
    "latitude": 21.27552,
    "longitude": -99.20596
  },
  {
    "latitude": 21.2738,
    "longitude": -99.2063
  },
  {
    "latitude": 21.27308,
    "longitude": -99.20445
  },
  {
    "latitude": 21.27198,
    "longitude": -99.20313
  },
  {
    "latitude": 21.27085,
    "longitude": -99.20262
  },
  {
    "latitude": 21.26919,
    "longitude": -99.20278
  },
  {
    "latitude": 21.26782,
    "longitude": -99.20066
  },
  {
    "latitude": 21.26599,
    "longitude": -99.20037
  },
  {
    "latitude": 21.2657,
    "longitude": -99.19939
  },
  {
    "latitude": 21.26364,
    "longitude": -99.19716
  },
  {
    "latitude": 21.26108,
    "longitude": -99.19533
  },
  {
    "latitude": 21.25831,
    "longitude": -99.19455
  },
  {
    "latitude": 21.2571,
    "longitude": -99.19031
  },
  {
    "latitude": 21.25648,
    "longitude": -99.18939
  },
  {
    "latitude": 21.25628,
    "longitude": -99.18552
  },
  {
    "latitude": 21.25798,
    "longitude": -99.18224
  },
  {
    "latitude": 21.26336,
    "longitude": -99.17996
  },
  {
    "latitude": 21.26258,
    "longitude": -99.17266
  },
  {
    "latitude": 21.26466,
    "longitude": -99.16732
  },
  {
    "latitude": 21.27127,
    "longitude": -99.15999
  },
  {
    "latitude": 21.27326,
    "longitude": -99.15857
  },
  {
    "latitude": 21.27554,
    "longitude": -99.15544
  },
  {
    "latitude": 21.27574,
    "longitude": -99.15336
  },
  {
    "latitude": 21.27915,
    "longitude": -99.15036
  },
  {
    "latitude": 21.28113,
    "longitude": -99.14652
  },
  {
    "latitude": 21.28395,
    "longitude": -99.1438
  },
  {
    "latitude": 21.28547,
    "longitude": -99.14292
  },
  {
    "latitude": 21.28705,
    "longitude": -99.14104
  },
  {
    "latitude": 21.29059,
    "longitude": -99.13354
  },
  {
    "latitude": 21.29234,
    "longitude": -99.13191
  },
  {
    "latitude": 21.29223,
    "longitude": -99.12374
  },
  {
    "latitude": 21.29293,
    "longitude": -99.11801
  },
  {
    "latitude": 21.29119,
    "longitude": -99.11352
  },
  {
    "latitude": 21.29086,
    "longitude": -99.11067
  },
  {
    "latitude": 21.29177,
    "longitude": -99.10691
  },
  {
    "latitude": 21.29265,
    "longitude": -99.10554
  },
  {
    "latitude": 21.29356,
    "longitude": -99.10115
  },
  {
    "latitude": 21.29587,
    "longitude": -99.09719
  },
  {
    "latitude": 21.29564,
    "longitude": -99.09384
  },
  {
    "latitude": 21.29671,
    "longitude": -99.09216
  },
  {
    "latitude": 21.29735,
    "longitude": -99.08919
  },
  {
    "latitude": 21.2971,
    "longitude": -99.08559
  },
  {
    "latitude": 21.29762,
    "longitude": -99.08528
  },
  {
    "latitude": 21.29939,
    "longitude": -99.0856
  },
  {
    "latitude": 21.30183,
    "longitude": -99.08538
  },
  {
    "latitude": 21.30287,
    "longitude": -99.08614
  },
  {
    "latitude": 21.30441,
    "longitude": -99.08924
  },
  {
    "latitude": 21.30562,
    "longitude": -99.09002
  },
  {
    "latitude": 21.30777,
    "longitude": -99.08961
  },
  {
    "latitude": 21.30913,
    "longitude": -99.08863
  },
  {
    "latitude": 21.30626,
    "longitude": -99.07951
  },
  {
    "latitude": 21.30468,
    "longitude": -99.07618
  },
  {
    "latitude": 21.30622,
    "longitude": -99.07438
  },
  {
    "latitude": 21.30644,
    "longitude": -99.07309
  },
  {
    "latitude": 21.30524,
    "longitude": -99.06883
  },
  {
    "latitude": 21.3021,
    "longitude": -99.06502
  },
  {
    "latitude": 21.30284,
    "longitude": -99.06353
  },
  {
    "latitude": 21.30283,
    "longitude": -99.06245
  },
  {
    "latitude": 21.30499,
    "longitude": -99.06158
  },
  {
    "latitude": 21.30911,
    "longitude": -99.06127
  },
  {
    "latitude": 21.31087,
    "longitude": -99.06067
  },
  {
    "latitude": 21.31179,
    "longitude": -99.06091
  },
  {
    "latitude": 21.31312,
    "longitude": -99.06033
  },
  {
    "latitude": 21.3144,
    "longitude": -99.05955
  },
  {
    "latitude": 21.31467,
    "longitude": -99.05887
  },
  {
    "latitude": 21.31621,
    "longitude": -99.05755
  },
  {
    "latitude": 21.31764,
    "longitude": -99.057
  },
  {
    "latitude": 21.32163,
    "longitude": -99.05134
  },
  {
    "latitude": 21.32219,
    "longitude": -99.05105
  },
  {
    "latitude": 21.32821,
    "longitude": -99.04931
  },
  {
    "latitude": 21.33001,
    "longitude": -99.05017
  },
  {
    "latitude": 21.33213,
    "longitude": -99.04969
  },
  {
    "latitude": 21.33369,
    "longitude": -99.05007
  },
  {
    "latitude": 21.33754,
    "longitude": -99.04773
  },
  {
    "latitude": 21.33887,
    "longitude": -99.04856
  },
  {
    "latitude": 21.33885,
    "longitude": -99.04496
  },
  {
    "latitude": 21.33969,
    "longitude": -99.04423
  },
  {
    "latitude": 21.34061,
    "longitude": -99.04441
  },
  {
    "latitude": 21.34147,
    "longitude": -99.04399
  },
  {
    "latitude": 21.34231,
    "longitude": -99.04539
  },
  {
    "latitude": 21.34598,
    "longitude": -99.0461
  },
  {
    "latitude": 21.34746,
    "longitude": -99.04534
  },
  {
    "latitude": 21.34993,
    "longitude": -99.04559
  },
  {
    "latitude": 21.3527,
    "longitude": -99.04771
  },
  {
    "latitude": 21.35413,
    "longitude": -99.04777
  },
  {
    "latitude": 21.35508,
    "longitude": -99.0497
  },
  {
    "latitude": 21.35732,
    "longitude": -99.05108
  },
  {
    "latitude": 21.35816,
    "longitude": -99.05116
  },
  {
    "latitude": 21.35955,
    "longitude": -99.04896
  },
  {
    "latitude": 21.35973,
    "longitude": -99.04669
  },
  {
    "latitude": 21.36061,
    "longitude": -99.04524
  },
  {
    "latitude": 21.36136,
    "longitude": -99.04157
  },
  {
    "latitude": 21.36057,
    "longitude": -99.03749
  },
  {
    "latitude": 21.36099,
    "longitude": -99.03546
  },
  {
    "latitude": 21.3596,
    "longitude": -99.03296
  },
  {
    "latitude": 21.36001,
    "longitude": -99.03129
  },
  {
    "latitude": 21.35976,
    "longitude": -99.02814
  },
  {
    "latitude": 21.35895,
    "longitude": -99.02745
  },
  {
    "latitude": 21.35992,
    "longitude": -99.02641
  },
  {
    "latitude": 21.35976,
    "longitude": -99.02418
  },
  {
    "latitude": 21.36171,
    "longitude": -99.02297
  },
  {
    "latitude": 21.36097,
    "longitude": -99.02184
  },
  {
    "latitude": 21.36227,
    "longitude": -99.02169
  },
  {
    "latitude": 21.36223,
    "longitude": -99.02081
  },
  {
    "latitude": 21.36326,
    "longitude": -99.02033
  },
  {
    "latitude": 21.36318,
    "longitude": -99.01912
  },
  {
    "latitude": 21.36416,
    "longitude": -99.01929
  },
  {
    "latitude": 21.36517,
    "longitude": -99.01835
  },
  {
    "latitude": 21.36496,
    "longitude": -99.01678
  },
  {
    "latitude": 21.36851,
    "longitude": -99.01582
  },
  {
    "latitude": 21.37015,
    "longitude": -99.01416
  },
  {
    "latitude": 21.3712,
    "longitude": -99.01367
  },
  {
    "latitude": 21.37094,
    "longitude": -99.01244
  },
  {
    "latitude": 21.37123,
    "longitude": -99.01155
  },
  {
    "latitude": 21.37238,
    "longitude": -99.01134
  },
  {
    "latitude": 21.37251,
    "longitude": -99.00979
  },
  {
    "latitude": 21.37316,
    "longitude": -99.00913
  },
  {
    "latitude": 21.37285,
    "longitude": -99.00814
  },
  {
    "latitude": 21.3731,
    "longitude": -99.00722
  },
  {
    "latitude": 21.3727,
    "longitude": -99.00644
  },
  {
    "latitude": 21.37347,
    "longitude": -99.0054
  },
  {
    "latitude": 21.37333,
    "longitude": -99.00446
  },
  {
    "latitude": 21.37515,
    "longitude": -99.00414
  },
  {
    "latitude": 21.37636,
    "longitude": -99.00471
  },
  {
    "latitude": 21.37706,
    "longitude": -99.00402
  },
  {
    "latitude": 21.37872,
    "longitude": -99.00449
  },
  {
    "latitude": 21.37938,
    "longitude": -99.00393
  },
  {
    "latitude": 21.37904,
    "longitude": -99.00148
  },
  {
    "latitude": 21.37953,
    "longitude": -99.0001
  },
  {
    "latitude": 21.37852,
    "longitude": -98.99581
  },
  {
    "latitude": 21.38046,
    "longitude": -98.99344
  },
  {
    "latitude": 21.38138,
    "longitude": -98.99143
  },
  {
    "latitude": 21.38245,
    "longitude": -98.99077
  },
  {
    "latitude": 21.38334,
    "longitude": -98.99146
  },
  {
    "latitude": 21.38402,
    "longitude": -98.99284
  },
  {
    "latitude": 21.38461,
    "longitude": -98.99292
  },
  {
    "latitude": 21.38548,
    "longitude": -98.99198
  },
  {
    "latitude": 21.38504,
    "longitude": -98.99114
  },
  {
    "latitude": 21.38492,
    "longitude": -98.9889
  },
  {
    "latitude": 21.38535,
    "longitude": -98.9884
  },
  {
    "latitude": 21.38543,
    "longitude": -98.98919
  }
];

// 2. Carretera Federal 120 & 100: Jalpan de Serra <-> Santiago de Querétaro (613 puntos)
export const REAL_JALPAN_QUERETARO_HIGHWAY: Coordinate[] = [
  {
    "latitude": 21.21721,
    "longitude": -99.47075
  },
  {
    "latitude": 21.21688,
    "longitude": -99.4714
  },
  {
    "latitude": 21.21845,
    "longitude": -99.47282
  },
  {
    "latitude": 21.21784,
    "longitude": -99.47436
  },
  {
    "latitude": 21.21729,
    "longitude": -99.47414
  },
  {
    "latitude": 21.21615,
    "longitude": -99.47712
  },
  {
    "latitude": 21.2169,
    "longitude": -99.47765
  },
  {
    "latitude": 21.21649,
    "longitude": -99.48052
  },
  {
    "latitude": 21.21591,
    "longitude": -99.48109
  },
  {
    "latitude": 21.21558,
    "longitude": -99.48264
  },
  {
    "latitude": 21.21422,
    "longitude": -99.48229
  },
  {
    "latitude": 21.21395,
    "longitude": -99.48282
  },
  {
    "latitude": 21.21423,
    "longitude": -99.48412
  },
  {
    "latitude": 21.21511,
    "longitude": -99.4843
  },
  {
    "latitude": 21.21602,
    "longitude": -99.48392
  },
  {
    "latitude": 21.21657,
    "longitude": -99.48482
  },
  {
    "latitude": 21.2165,
    "longitude": -99.48789
  },
  {
    "latitude": 21.21424,
    "longitude": -99.48901
  },
  {
    "latitude": 21.21409,
    "longitude": -99.48945
  },
  {
    "latitude": 21.21402,
    "longitude": -99.49353
  },
  {
    "latitude": 21.21467,
    "longitude": -99.49436
  },
  {
    "latitude": 21.21411,
    "longitude": -99.49618
  },
  {
    "latitude": 21.21289,
    "longitude": -99.49641
  },
  {
    "latitude": 21.21204,
    "longitude": -99.49713
  },
  {
    "latitude": 21.21122,
    "longitude": -99.4965
  },
  {
    "latitude": 21.21011,
    "longitude": -99.49664
  },
  {
    "latitude": 21.20933,
    "longitude": -99.49763
  },
  {
    "latitude": 21.20825,
    "longitude": -99.49705
  },
  {
    "latitude": 21.20678,
    "longitude": -99.49849
  },
  {
    "latitude": 21.20624,
    "longitude": -99.49833
  },
  {
    "latitude": 21.2062,
    "longitude": -99.49727
  },
  {
    "latitude": 21.20559,
    "longitude": -99.4971
  },
  {
    "latitude": 21.20466,
    "longitude": -99.49767
  },
  {
    "latitude": 21.20372,
    "longitude": -99.4976
  },
  {
    "latitude": 21.20289,
    "longitude": -99.4988
  },
  {
    "latitude": 21.20089,
    "longitude": -99.49746
  },
  {
    "latitude": 21.19814,
    "longitude": -99.49748
  },
  {
    "latitude": 21.19733,
    "longitude": -99.49646
  },
  {
    "latitude": 21.19703,
    "longitude": -99.49687
  },
  {
    "latitude": 21.19761,
    "longitude": -99.49945
  },
  {
    "latitude": 21.19876,
    "longitude": -99.50148
  },
  {
    "latitude": 21.1997,
    "longitude": -99.50188
  },
  {
    "latitude": 21.19995,
    "longitude": -99.50292
  },
  {
    "latitude": 21.20113,
    "longitude": -99.50353
  },
  {
    "latitude": 21.20192,
    "longitude": -99.50484
  },
  {
    "latitude": 21.20129,
    "longitude": -99.50818
  },
  {
    "latitude": 21.20153,
    "longitude": -99.5102
  },
  {
    "latitude": 21.2027,
    "longitude": -99.51254
  },
  {
    "latitude": 21.2047,
    "longitude": -99.51438
  },
  {
    "latitude": 21.2078,
    "longitude": -99.51455
  },
  {
    "latitude": 21.20839,
    "longitude": -99.51573
  },
  {
    "latitude": 21.21002,
    "longitude": -99.51632
  },
  {
    "latitude": 21.21147,
    "longitude": -99.51753
  },
  {
    "latitude": 21.21077,
    "longitude": -99.51923
  },
  {
    "latitude": 21.21188,
    "longitude": -99.52034
  },
  {
    "latitude": 21.21184,
    "longitude": -99.5212
  },
  {
    "latitude": 21.21091,
    "longitude": -99.52298
  },
  {
    "latitude": 21.21104,
    "longitude": -99.52412
  },
  {
    "latitude": 21.21005,
    "longitude": -99.52676
  },
  {
    "latitude": 21.2111,
    "longitude": -99.53048
  },
  {
    "latitude": 21.20988,
    "longitude": -99.53157
  },
  {
    "latitude": 21.20981,
    "longitude": -99.53238
  },
  {
    "latitude": 21.21216,
    "longitude": -99.53363
  },
  {
    "latitude": 21.21307,
    "longitude": -99.53659
  },
  {
    "latitude": 21.21538,
    "longitude": -99.5411
  },
  {
    "latitude": 21.21429,
    "longitude": -99.54249
  },
  {
    "latitude": 21.21031,
    "longitude": -99.54487
  },
  {
    "latitude": 21.2085,
    "longitude": -99.54759
  },
  {
    "latitude": 21.20843,
    "longitude": -99.54926
  },
  {
    "latitude": 21.20724,
    "longitude": -99.55076
  },
  {
    "latitude": 21.20847,
    "longitude": -99.55404
  },
  {
    "latitude": 21.20762,
    "longitude": -99.55907
  },
  {
    "latitude": 21.20357,
    "longitude": -99.56323
  },
  {
    "latitude": 21.20394,
    "longitude": -99.56568
  },
  {
    "latitude": 21.20314,
    "longitude": -99.56677
  },
  {
    "latitude": 21.20103,
    "longitude": -99.5678
  },
  {
    "latitude": 21.19983,
    "longitude": -99.56725
  },
  {
    "latitude": 21.19789,
    "longitude": -99.56812
  },
  {
    "latitude": 21.1966,
    "longitude": -99.56801
  },
  {
    "latitude": 21.19535,
    "longitude": -99.56924
  },
  {
    "latitude": 21.19341,
    "longitude": -99.56932
  },
  {
    "latitude": 21.19276,
    "longitude": -99.57082
  },
  {
    "latitude": 21.19192,
    "longitude": -99.57031
  },
  {
    "latitude": 21.19042,
    "longitude": -99.57067
  },
  {
    "latitude": 21.18746,
    "longitude": -99.56984
  },
  {
    "latitude": 21.18626,
    "longitude": -99.57133
  },
  {
    "latitude": 21.18601,
    "longitude": -99.57021
  },
  {
    "latitude": 21.18512,
    "longitude": -99.5692
  },
  {
    "latitude": 21.18339,
    "longitude": -99.56892
  },
  {
    "latitude": 21.18464,
    "longitude": -99.56732
  },
  {
    "latitude": 21.18499,
    "longitude": -99.56568
  },
  {
    "latitude": 21.18343,
    "longitude": -99.56572
  },
  {
    "latitude": 21.18119,
    "longitude": -99.56661
  },
  {
    "latitude": 21.18089,
    "longitude": -99.56638
  },
  {
    "latitude": 21.18138,
    "longitude": -99.56516
  },
  {
    "latitude": 21.18059,
    "longitude": -99.56538
  },
  {
    "latitude": 21.18022,
    "longitude": -99.56662
  },
  {
    "latitude": 21.18057,
    "longitude": -99.56708
  },
  {
    "latitude": 21.18367,
    "longitude": -99.56655
  },
  {
    "latitude": 21.18282,
    "longitude": -99.56804
  },
  {
    "latitude": 21.18065,
    "longitude": -99.56971
  },
  {
    "latitude": 21.18078,
    "longitude": -99.57032
  },
  {
    "latitude": 21.18281,
    "longitude": -99.57174
  },
  {
    "latitude": 21.18235,
    "longitude": -99.57313
  },
  {
    "latitude": 21.18522,
    "longitude": -99.57606
  },
  {
    "latitude": 21.1869,
    "longitude": -99.5758
  },
  {
    "latitude": 21.18739,
    "longitude": -99.57629
  },
  {
    "latitude": 21.18719,
    "longitude": -99.57667
  },
  {
    "latitude": 21.18583,
    "longitude": -99.57686
  },
  {
    "latitude": 21.18459,
    "longitude": -99.57658
  },
  {
    "latitude": 21.18124,
    "longitude": -99.57447
  },
  {
    "latitude": 21.18057,
    "longitude": -99.57304
  },
  {
    "latitude": 21.18023,
    "longitude": -99.57347
  },
  {
    "latitude": 21.18191,
    "longitude": -99.57651
  },
  {
    "latitude": 21.18545,
    "longitude": -99.57844
  },
  {
    "latitude": 21.18492,
    "longitude": -99.58
  },
  {
    "latitude": 21.18636,
    "longitude": -99.58125
  },
  {
    "latitude": 21.18624,
    "longitude": -99.5817
  },
  {
    "latitude": 21.18467,
    "longitude": -99.58031
  },
  {
    "latitude": 21.18474,
    "longitude": -99.57851
  },
  {
    "latitude": 21.1807,
    "longitude": -99.57771
  },
  {
    "latitude": 21.17914,
    "longitude": -99.57633
  },
  {
    "latitude": 21.17904,
    "longitude": -99.57563
  },
  {
    "latitude": 21.17784,
    "longitude": -99.57423
  },
  {
    "latitude": 21.17691,
    "longitude": -99.57363
  },
  {
    "latitude": 21.17534,
    "longitude": -99.57361
  },
  {
    "latitude": 21.17618,
    "longitude": -99.57237
  },
  {
    "latitude": 21.17608,
    "longitude": -99.57185
  },
  {
    "latitude": 21.17512,
    "longitude": -99.57124
  },
  {
    "latitude": 21.17512,
    "longitude": -99.57034
  },
  {
    "latitude": 21.17398,
    "longitude": -99.56906
  },
  {
    "latitude": 21.17294,
    "longitude": -99.56864
  },
  {
    "latitude": 21.17238,
    "longitude": -99.56702
  },
  {
    "latitude": 21.1715,
    "longitude": -99.56682
  },
  {
    "latitude": 21.17039,
    "longitude": -99.5675
  },
  {
    "latitude": 21.16925,
    "longitude": -99.56713
  },
  {
    "latitude": 21.16897,
    "longitude": -99.56858
  },
  {
    "latitude": 21.16773,
    "longitude": -99.56747
  },
  {
    "latitude": 21.16674,
    "longitude": -99.56751
  },
  {
    "latitude": 21.1656,
    "longitude": -99.5688
  },
  {
    "latitude": 21.16416,
    "longitude": -99.56913
  },
  {
    "latitude": 21.16311,
    "longitude": -99.56998
  },
  {
    "latitude": 21.16229,
    "longitude": -99.57184
  },
  {
    "latitude": 21.16238,
    "longitude": -99.57449
  },
  {
    "latitude": 21.16391,
    "longitude": -99.57621
  },
  {
    "latitude": 21.16214,
    "longitude": -99.57664
  },
  {
    "latitude": 21.16145,
    "longitude": -99.57819
  },
  {
    "latitude": 21.16219,
    "longitude": -99.57935
  },
  {
    "latitude": 21.16216,
    "longitude": -99.58181
  },
  {
    "latitude": 21.1654,
    "longitude": -99.58424
  },
  {
    "latitude": 21.16534,
    "longitude": -99.58544
  },
  {
    "latitude": 21.16631,
    "longitude": -99.58607
  },
  {
    "latitude": 21.16573,
    "longitude": -99.5876
  },
  {
    "latitude": 21.16597,
    "longitude": -99.58939
  },
  {
    "latitude": 21.16695,
    "longitude": -99.59153
  },
  {
    "latitude": 21.16608,
    "longitude": -99.59252
  },
  {
    "latitude": 21.16519,
    "longitude": -99.5926
  },
  {
    "latitude": 21.16461,
    "longitude": -99.5936
  },
  {
    "latitude": 21.16517,
    "longitude": -99.59579
  },
  {
    "latitude": 21.16615,
    "longitude": -99.59609
  },
  {
    "latitude": 21.16675,
    "longitude": -99.5969
  },
  {
    "latitude": 21.16705,
    "longitude": -99.60032
  },
  {
    "latitude": 21.16586,
    "longitude": -99.60074
  },
  {
    "latitude": 21.16479,
    "longitude": -99.60235
  },
  {
    "latitude": 21.16378,
    "longitude": -99.60201
  },
  {
    "latitude": 21.1611,
    "longitude": -99.60282
  },
  {
    "latitude": 21.16107,
    "longitude": -99.60333
  },
  {
    "latitude": 21.16167,
    "longitude": -99.60375
  },
  {
    "latitude": 21.16154,
    "longitude": -99.60501
  },
  {
    "latitude": 21.15893,
    "longitude": -99.60419
  },
  {
    "latitude": 21.1585,
    "longitude": -99.60332
  },
  {
    "latitude": 21.15596,
    "longitude": -99.60416
  },
  {
    "latitude": 21.15436,
    "longitude": -99.60651
  },
  {
    "latitude": 21.15336,
    "longitude": -99.60662
  },
  {
    "latitude": 21.15191,
    "longitude": -99.60577
  },
  {
    "latitude": 21.14979,
    "longitude": -99.60891
  },
  {
    "latitude": 21.15012,
    "longitude": -99.60982
  },
  {
    "latitude": 21.14995,
    "longitude": -99.61132
  },
  {
    "latitude": 21.15029,
    "longitude": -99.61173
  },
  {
    "latitude": 21.15114,
    "longitude": -99.61156
  },
  {
    "latitude": 21.1529,
    "longitude": -99.61039
  },
  {
    "latitude": 21.15307,
    "longitude": -99.61083
  },
  {
    "latitude": 21.15211,
    "longitude": -99.61227
  },
  {
    "latitude": 21.1525,
    "longitude": -99.61306
  },
  {
    "latitude": 21.14992,
    "longitude": -99.61498
  },
  {
    "latitude": 21.14979,
    "longitude": -99.6154
  },
  {
    "latitude": 21.15063,
    "longitude": -99.61619
  },
  {
    "latitude": 21.14955,
    "longitude": -99.61732
  },
  {
    "latitude": 21.1482,
    "longitude": -99.61765
  },
  {
    "latitude": 21.14702,
    "longitude": -99.61869
  },
  {
    "latitude": 21.14532,
    "longitude": -99.61842
  },
  {
    "latitude": 21.14564,
    "longitude": -99.61949
  },
  {
    "latitude": 21.14492,
    "longitude": -99.62107
  },
  {
    "latitude": 21.14307,
    "longitude": -99.62139
  },
  {
    "latitude": 21.14148,
    "longitude": -99.62087
  },
  {
    "latitude": 21.14057,
    "longitude": -99.62001
  },
  {
    "latitude": 21.13825,
    "longitude": -99.62019
  },
  {
    "latitude": 21.13595,
    "longitude": -99.62116
  },
  {
    "latitude": 21.13383,
    "longitude": -99.62262
  },
  {
    "latitude": 21.13413,
    "longitude": -99.62354
  },
  {
    "latitude": 21.13537,
    "longitude": -99.62292
  },
  {
    "latitude": 21.13598,
    "longitude": -99.62334
  },
  {
    "latitude": 21.13476,
    "longitude": -99.62427
  },
  {
    "latitude": 21.13513,
    "longitude": -99.62546
  },
  {
    "latitude": 21.13788,
    "longitude": -99.62646
  },
  {
    "latitude": 21.13734,
    "longitude": -99.62568
  },
  {
    "latitude": 21.13811,
    "longitude": -99.62515
  },
  {
    "latitude": 21.13898,
    "longitude": -99.62559
  },
  {
    "latitude": 21.13899,
    "longitude": -99.6262
  },
  {
    "latitude": 21.13788,
    "longitude": -99.62646
  },
  {
    "latitude": 21.13702,
    "longitude": -99.62596
  },
  {
    "latitude": 21.13635,
    "longitude": -99.62606
  },
  {
    "latitude": 21.13547,
    "longitude": -99.62899
  },
  {
    "latitude": 21.13627,
    "longitude": -99.63047
  },
  {
    "latitude": 21.13615,
    "longitude": -99.63145
  },
  {
    "latitude": 21.13471,
    "longitude": -99.63378
  },
  {
    "latitude": 21.13228,
    "longitude": -99.63478
  },
  {
    "latitude": 21.13141,
    "longitude": -99.63473
  },
  {
    "latitude": 21.13322,
    "longitude": -99.63492
  },
  {
    "latitude": 21.13332,
    "longitude": -99.6354
  },
  {
    "latitude": 21.12985,
    "longitude": -99.63573
  },
  {
    "latitude": 21.12933,
    "longitude": -99.63675
  },
  {
    "latitude": 21.12776,
    "longitude": -99.63638
  },
  {
    "latitude": 21.12669,
    "longitude": -99.63762
  },
  {
    "latitude": 21.1263,
    "longitude": -99.64009
  },
  {
    "latitude": 21.12777,
    "longitude": -99.64053
  },
  {
    "latitude": 21.12786,
    "longitude": -99.64086
  },
  {
    "latitude": 21.12668,
    "longitude": -99.64084
  },
  {
    "latitude": 21.12481,
    "longitude": -99.64192
  },
  {
    "latitude": 21.12422,
    "longitude": -99.64316
  },
  {
    "latitude": 21.12423,
    "longitude": -99.6464
  },
  {
    "latitude": 21.1233,
    "longitude": -99.64762
  },
  {
    "latitude": 21.12266,
    "longitude": -99.64757
  },
  {
    "latitude": 21.12124,
    "longitude": -99.64863
  },
  {
    "latitude": 21.12223,
    "longitude": -99.65046
  },
  {
    "latitude": 21.12244,
    "longitude": -99.65354
  },
  {
    "latitude": 21.1216,
    "longitude": -99.65527
  },
  {
    "latitude": 21.12168,
    "longitude": -99.65671
  },
  {
    "latitude": 21.12002,
    "longitude": -99.65813
  },
  {
    "latitude": 21.11982,
    "longitude": -99.65955
  },
  {
    "latitude": 21.11883,
    "longitude": -99.66151
  },
  {
    "latitude": 21.11609,
    "longitude": -99.66422
  },
  {
    "latitude": 21.11667,
    "longitude": -99.66483
  },
  {
    "latitude": 21.11823,
    "longitude": -99.66287
  },
  {
    "latitude": 21.11944,
    "longitude": -99.66212
  },
  {
    "latitude": 21.12007,
    "longitude": -99.66349
  },
  {
    "latitude": 21.11953,
    "longitude": -99.6646
  },
  {
    "latitude": 21.1198,
    "longitude": -99.66539
  },
  {
    "latitude": 21.12068,
    "longitude": -99.66558
  },
  {
    "latitude": 21.12174,
    "longitude": -99.66683
  },
  {
    "latitude": 21.12391,
    "longitude": -99.66606
  },
  {
    "latitude": 21.12457,
    "longitude": -99.66757
  },
  {
    "latitude": 21.12345,
    "longitude": -99.66791
  },
  {
    "latitude": 21.12254,
    "longitude": -99.66893
  },
  {
    "latitude": 21.12178,
    "longitude": -99.67038
  },
  {
    "latitude": 21.12243,
    "longitude": -99.6713
  },
  {
    "latitude": 21.12237,
    "longitude": -99.67186
  },
  {
    "latitude": 21.12136,
    "longitude": -99.6725
  },
  {
    "latitude": 21.12052,
    "longitude": -99.67392
  },
  {
    "latitude": 21.11859,
    "longitude": -99.67541
  },
  {
    "latitude": 21.1182,
    "longitude": -99.67616
  },
  {
    "latitude": 21.11618,
    "longitude": -99.67661
  },
  {
    "latitude": 21.1154,
    "longitude": -99.67736
  },
  {
    "latitude": 21.11442,
    "longitude": -99.67716
  },
  {
    "latitude": 21.11307,
    "longitude": -99.67855
  },
  {
    "latitude": 21.11284,
    "longitude": -99.67931
  },
  {
    "latitude": 21.11183,
    "longitude": -99.67968
  },
  {
    "latitude": 21.11168,
    "longitude": -99.68103
  },
  {
    "latitude": 21.1104,
    "longitude": -99.68161
  },
  {
    "latitude": 21.10851,
    "longitude": -99.68344
  },
  {
    "latitude": 21.10777,
    "longitude": -99.68284
  },
  {
    "latitude": 21.10632,
    "longitude": -99.68306
  },
  {
    "latitude": 21.1062,
    "longitude": -99.68224
  },
  {
    "latitude": 21.10579,
    "longitude": -99.68215
  },
  {
    "latitude": 21.10659,
    "longitude": -99.68396
  },
  {
    "latitude": 21.10598,
    "longitude": -99.68568
  },
  {
    "latitude": 21.10455,
    "longitude": -99.68614
  },
  {
    "latitude": 21.10351,
    "longitude": -99.68802
  },
  {
    "latitude": 21.10235,
    "longitude": -99.68806
  },
  {
    "latitude": 21.10242,
    "longitude": -99.6906
  },
  {
    "latitude": 21.10063,
    "longitude": -99.69074
  },
  {
    "latitude": 21.09886,
    "longitude": -99.69264
  },
  {
    "latitude": 21.09896,
    "longitude": -99.69317
  },
  {
    "latitude": 21.09994,
    "longitude": -99.69357
  },
  {
    "latitude": 21.10038,
    "longitude": -99.69477
  },
  {
    "latitude": 21.10132,
    "longitude": -99.69577
  },
  {
    "latitude": 21.10326,
    "longitude": -99.69436
  },
  {
    "latitude": 21.10451,
    "longitude": -99.6943
  },
  {
    "latitude": 21.10532,
    "longitude": -99.69289
  },
  {
    "latitude": 21.10496,
    "longitude": -99.69194
  },
  {
    "latitude": 21.10516,
    "longitude": -99.69145
  },
  {
    "latitude": 21.10623,
    "longitude": -99.69285
  },
  {
    "latitude": 21.10516,
    "longitude": -99.69591
  },
  {
    "latitude": 21.10276,
    "longitude": -99.69847
  },
  {
    "latitude": 21.10188,
    "longitude": -99.69866
  },
  {
    "latitude": 21.10086,
    "longitude": -99.69963
  },
  {
    "latitude": 21.09985,
    "longitude": -99.70247
  },
  {
    "latitude": 21.0998,
    "longitude": -99.70424
  },
  {
    "latitude": 21.10084,
    "longitude": -99.706
  },
  {
    "latitude": 21.10182,
    "longitude": -99.70533
  },
  {
    "latitude": 21.10253,
    "longitude": -99.70663
  },
  {
    "latitude": 21.10356,
    "longitude": -99.70602
  },
  {
    "latitude": 21.1041,
    "longitude": -99.70703
  },
  {
    "latitude": 21.10528,
    "longitude": -99.70701
  },
  {
    "latitude": 21.10453,
    "longitude": -99.70834
  },
  {
    "latitude": 21.10333,
    "longitude": -99.70895
  },
  {
    "latitude": 21.10202,
    "longitude": -99.71075
  },
  {
    "latitude": 21.10094,
    "longitude": -99.71143
  },
  {
    "latitude": 21.10221,
    "longitude": -99.71186
  },
  {
    "latitude": 21.10343,
    "longitude": -99.71176
  },
  {
    "latitude": 21.10385,
    "longitude": -99.71299
  },
  {
    "latitude": 21.10503,
    "longitude": -99.71321
  },
  {
    "latitude": 21.10551,
    "longitude": -99.71373
  },
  {
    "latitude": 21.10712,
    "longitude": -99.71381
  },
  {
    "latitude": 21.10633,
    "longitude": -99.71774
  },
  {
    "latitude": 21.10834,
    "longitude": -99.71934
  },
  {
    "latitude": 21.1085,
    "longitude": -99.72172
  },
  {
    "latitude": 21.10718,
    "longitude": -99.72199
  },
  {
    "latitude": 21.10687,
    "longitude": -99.72294
  },
  {
    "latitude": 21.10575,
    "longitude": -99.72296
  },
  {
    "latitude": 21.10539,
    "longitude": -99.7227
  },
  {
    "latitude": 21.10533,
    "longitude": -99.72151
  },
  {
    "latitude": 21.10472,
    "longitude": -99.72142
  },
  {
    "latitude": 21.10448,
    "longitude": -99.72243
  },
  {
    "latitude": 21.10515,
    "longitude": -99.7256
  },
  {
    "latitude": 21.10489,
    "longitude": -99.72654
  },
  {
    "latitude": 21.10373,
    "longitude": -99.72625
  },
  {
    "latitude": 21.10419,
    "longitude": -99.72827
  },
  {
    "latitude": 21.10301,
    "longitude": -99.72854
  },
  {
    "latitude": 21.10233,
    "longitude": -99.72796
  },
  {
    "latitude": 21.10065,
    "longitude": -99.72907
  },
  {
    "latitude": 21.09986,
    "longitude": -99.72826
  },
  {
    "latitude": 21.09898,
    "longitude": -99.72902
  },
  {
    "latitude": 21.09758,
    "longitude": -99.72893
  },
  {
    "latitude": 21.09633,
    "longitude": -99.73027
  },
  {
    "latitude": 21.09599,
    "longitude": -99.73186
  },
  {
    "latitude": 21.09493,
    "longitude": -99.73246
  },
  {
    "latitude": 21.09439,
    "longitude": -99.73359
  },
  {
    "latitude": 21.09363,
    "longitude": -99.734
  },
  {
    "latitude": 21.09287,
    "longitude": -99.73513
  },
  {
    "latitude": 21.0924,
    "longitude": -99.73507
  },
  {
    "latitude": 21.09077,
    "longitude": -99.73284
  },
  {
    "latitude": 21.08823,
    "longitude": -99.7328
  },
  {
    "latitude": 21.08567,
    "longitude": -99.73428
  },
  {
    "latitude": 21.08526,
    "longitude": -99.73557
  },
  {
    "latitude": 21.08394,
    "longitude": -99.73547
  },
  {
    "latitude": 21.0842,
    "longitude": -99.73684
  },
  {
    "latitude": 21.08303,
    "longitude": -99.73954
  },
  {
    "latitude": 21.07961,
    "longitude": -99.74054
  },
  {
    "latitude": 21.0789,
    "longitude": -99.73937
  },
  {
    "latitude": 21.07798,
    "longitude": -99.73925
  },
  {
    "latitude": 21.07812,
    "longitude": -99.7383
  },
  {
    "latitude": 21.07664,
    "longitude": -99.73838
  },
  {
    "latitude": 21.07672,
    "longitude": -99.73711
  },
  {
    "latitude": 21.07565,
    "longitude": -99.73656
  },
  {
    "latitude": 21.07612,
    "longitude": -99.73548
  },
  {
    "latitude": 21.07521,
    "longitude": -99.73488
  },
  {
    "latitude": 21.0752,
    "longitude": -99.734
  },
  {
    "latitude": 21.07448,
    "longitude": -99.73327
  },
  {
    "latitude": 21.07435,
    "longitude": -99.73176
  },
  {
    "latitude": 21.07489,
    "longitude": -99.73096
  },
  {
    "latitude": 21.07473,
    "longitude": -99.73039
  },
  {
    "latitude": 21.07285,
    "longitude": -99.72872
  },
  {
    "latitude": 21.07192,
    "longitude": -99.72883
  },
  {
    "latitude": 21.07156,
    "longitude": -99.72823
  },
  {
    "latitude": 21.07087,
    "longitude": -99.72818
  },
  {
    "latitude": 21.07012,
    "longitude": -99.7272
  },
  {
    "latitude": 21.07005,
    "longitude": -99.72615
  },
  {
    "latitude": 21.07047,
    "longitude": -99.72555
  },
  {
    "latitude": 21.06889,
    "longitude": -99.72485
  },
  {
    "latitude": 21.06938,
    "longitude": -99.72345
  },
  {
    "latitude": 21.06811,
    "longitude": -99.7242
  },
  {
    "latitude": 21.06776,
    "longitude": -99.72223
  },
  {
    "latitude": 21.06718,
    "longitude": -99.7213
  },
  {
    "latitude": 21.06617,
    "longitude": -99.72161
  },
  {
    "latitude": 21.06555,
    "longitude": -99.72267
  },
  {
    "latitude": 21.06586,
    "longitude": -99.7242
  },
  {
    "latitude": 21.06451,
    "longitude": -99.72478
  },
  {
    "latitude": 21.06269,
    "longitude": -99.72434
  },
  {
    "latitude": 21.06174,
    "longitude": -99.72601
  },
  {
    "latitude": 21.06284,
    "longitude": -99.7263
  },
  {
    "latitude": 21.06326,
    "longitude": -99.72687
  },
  {
    "latitude": 21.06171,
    "longitude": -99.72741
  },
  {
    "latitude": 21.06166,
    "longitude": -99.72822
  },
  {
    "latitude": 21.05985,
    "longitude": -99.72826
  },
  {
    "latitude": 21.05915,
    "longitude": -99.72775
  },
  {
    "latitude": 21.05803,
    "longitude": -99.72882
  },
  {
    "latitude": 21.05674,
    "longitude": -99.72926
  },
  {
    "latitude": 21.05672,
    "longitude": -99.73137
  },
  {
    "latitude": 21.05759,
    "longitude": -99.7315
  },
  {
    "latitude": 21.05809,
    "longitude": -99.73241
  },
  {
    "latitude": 21.05908,
    "longitude": -99.73247
  },
  {
    "latitude": 21.05938,
    "longitude": -99.73318
  },
  {
    "latitude": 21.05764,
    "longitude": -99.73417
  },
  {
    "latitude": 21.05827,
    "longitude": -99.73497
  },
  {
    "latitude": 21.05811,
    "longitude": -99.73528
  },
  {
    "latitude": 21.05679,
    "longitude": -99.73512
  },
  {
    "latitude": 21.05563,
    "longitude": -99.73433
  },
  {
    "latitude": 21.05519,
    "longitude": -99.73447
  },
  {
    "latitude": 21.05546,
    "longitude": -99.73556
  },
  {
    "latitude": 21.05478,
    "longitude": -99.73669
  },
  {
    "latitude": 21.05571,
    "longitude": -99.7374
  },
  {
    "latitude": 21.05438,
    "longitude": -99.73829
  },
  {
    "latitude": 21.05537,
    "longitude": -99.73998
  },
  {
    "latitude": 21.05517,
    "longitude": -99.74068
  },
  {
    "latitude": 21.05095,
    "longitude": -99.74037
  },
  {
    "latitude": 21.04925,
    "longitude": -99.73933
  },
  {
    "latitude": 21.04852,
    "longitude": -99.73999
  },
  {
    "latitude": 21.04768,
    "longitude": -99.73963
  },
  {
    "latitude": 21.04725,
    "longitude": -99.74043
  },
  {
    "latitude": 21.04673,
    "longitude": -99.73978
  },
  {
    "latitude": 21.04533,
    "longitude": -99.74004
  },
  {
    "latitude": 21.04458,
    "longitude": -99.73934
  },
  {
    "latitude": 21.04384,
    "longitude": -99.73965
  },
  {
    "latitude": 21.04197,
    "longitude": -99.73811
  },
  {
    "latitude": 21.04187,
    "longitude": -99.73941
  },
  {
    "latitude": 21.04118,
    "longitude": -99.73991
  },
  {
    "latitude": 21.03881,
    "longitude": -99.73951
  },
  {
    "latitude": 21.0381,
    "longitude": -99.74057
  },
  {
    "latitude": 21.03716,
    "longitude": -99.7405
  },
  {
    "latitude": 21.03569,
    "longitude": -99.73938
  },
  {
    "latitude": 21.03567,
    "longitude": -99.7373
  },
  {
    "latitude": 21.03497,
    "longitude": -99.73682
  },
  {
    "latitude": 21.03395,
    "longitude": -99.7373
  },
  {
    "latitude": 21.0333,
    "longitude": -99.73848
  },
  {
    "latitude": 21.03176,
    "longitude": -99.73991
  },
  {
    "latitude": 21.02785,
    "longitude": -99.74215
  },
  {
    "latitude": 21.02513,
    "longitude": -99.74506
  },
  {
    "latitude": 21.02428,
    "longitude": -99.74525
  },
  {
    "latitude": 21.02135,
    "longitude": -99.74378
  },
  {
    "latitude": 21.01861,
    "longitude": -99.74331
  },
  {
    "latitude": 21.01594,
    "longitude": -99.74157
  },
  {
    "latitude": 21.01302,
    "longitude": -99.7406
  },
  {
    "latitude": 21.01216,
    "longitude": -99.73707
  },
  {
    "latitude": 21.0125,
    "longitude": -99.73524
  },
  {
    "latitude": 21.01222,
    "longitude": -99.73372
  },
  {
    "latitude": 21.01117,
    "longitude": -99.73372
  },
  {
    "latitude": 21.01059,
    "longitude": -99.73148
  },
  {
    "latitude": 21.00971,
    "longitude": -99.73156
  },
  {
    "latitude": 21.00969,
    "longitude": -99.7305
  },
  {
    "latitude": 21.00471,
    "longitude": -99.72787
  },
  {
    "latitude": 21.00123,
    "longitude": -99.72546
  },
  {
    "latitude": 21.00019,
    "longitude": -99.72637
  },
  {
    "latitude": 20.99983,
    "longitude": -99.72589
  },
  {
    "latitude": 20.99932,
    "longitude": -99.72615
  },
  {
    "latitude": 20.99789,
    "longitude": -99.72889
  },
  {
    "latitude": 20.99509,
    "longitude": -99.73086
  },
  {
    "latitude": 20.99337,
    "longitude": -99.72921
  },
  {
    "latitude": 20.99105,
    "longitude": -99.72813
  },
  {
    "latitude": 20.98794,
    "longitude": -99.72763
  },
  {
    "latitude": 20.98621,
    "longitude": -99.7281
  },
  {
    "latitude": 20.98557,
    "longitude": -99.72895
  },
  {
    "latitude": 20.98558,
    "longitude": -99.73045
  },
  {
    "latitude": 20.98613,
    "longitude": -99.73153
  },
  {
    "latitude": 20.98703,
    "longitude": -99.73197
  },
  {
    "latitude": 20.98727,
    "longitude": -99.73282
  },
  {
    "latitude": 20.98581,
    "longitude": -99.73396
  },
  {
    "latitude": 20.98272,
    "longitude": -99.7345
  },
  {
    "latitude": 20.98254,
    "longitude": -99.73215
  },
  {
    "latitude": 20.9813,
    "longitude": -99.73036
  },
  {
    "latitude": 20.98031,
    "longitude": -99.73028
  },
  {
    "latitude": 20.97848,
    "longitude": -99.73332
  },
  {
    "latitude": 20.9769,
    "longitude": -99.73424
  },
  {
    "latitude": 20.97666,
    "longitude": -99.73684
  },
  {
    "latitude": 20.97605,
    "longitude": -99.73714
  },
  {
    "latitude": 20.97415,
    "longitude": -99.73702
  },
  {
    "latitude": 20.97327,
    "longitude": -99.73751
  },
  {
    "latitude": 20.9725,
    "longitude": -99.73844
  },
  {
    "latitude": 20.9723,
    "longitude": -99.73973
  },
  {
    "latitude": 20.97135,
    "longitude": -99.74019
  },
  {
    "latitude": 20.97114,
    "longitude": -99.74178
  },
  {
    "latitude": 20.96597,
    "longitude": -99.74549
  },
  {
    "latitude": 20.95923,
    "longitude": -99.74874
  },
  {
    "latitude": 20.95378,
    "longitude": -99.74872
  },
  {
    "latitude": 20.94517,
    "longitude": -99.74986
  },
  {
    "latitude": 20.94342,
    "longitude": -99.74497
  },
  {
    "latitude": 20.94189,
    "longitude": -99.74399
  },
  {
    "latitude": 20.94287,
    "longitude": -99.7417
  },
  {
    "latitude": 20.94435,
    "longitude": -99.74044
  },
  {
    "latitude": 20.94425,
    "longitude": -99.73938
  },
  {
    "latitude": 20.94249,
    "longitude": -99.73842
  },
  {
    "latitude": 20.94006,
    "longitude": -99.73803
  },
  {
    "latitude": 20.93922,
    "longitude": -99.73716
  },
  {
    "latitude": 20.9386,
    "longitude": -99.73565
  },
  {
    "latitude": 20.93784,
    "longitude": -99.73536
  },
  {
    "latitude": 20.93693,
    "longitude": -99.7335
  },
  {
    "latitude": 20.93606,
    "longitude": -99.73277
  },
  {
    "latitude": 20.93456,
    "longitude": -99.7331
  },
  {
    "latitude": 20.93144,
    "longitude": -99.73194
  },
  {
    "latitude": 20.93149,
    "longitude": -99.73104
  },
  {
    "latitude": 20.92987,
    "longitude": -99.72906
  },
  {
    "latitude": 20.92695,
    "longitude": -99.72987
  },
  {
    "latitude": 20.91956,
    "longitude": -99.72886
  },
  {
    "latitude": 20.91676,
    "longitude": -99.72552
  },
  {
    "latitude": 20.90687,
    "longitude": -99.71908
  },
  {
    "latitude": 20.90584,
    "longitude": -99.71785
  },
  {
    "latitude": 20.90162,
    "longitude": -99.71836
  },
  {
    "latitude": 20.90049,
    "longitude": -99.71757
  },
  {
    "latitude": 20.89819,
    "longitude": -99.71785
  },
  {
    "latitude": 20.89843,
    "longitude": -99.71631
  },
  {
    "latitude": 20.89729,
    "longitude": -99.71663
  },
  {
    "latitude": 20.89689,
    "longitude": -99.71632
  },
  {
    "latitude": 20.89727,
    "longitude": -99.71556
  },
  {
    "latitude": 20.8969,
    "longitude": -99.71488
  },
  {
    "latitude": 20.89726,
    "longitude": -99.71157
  },
  {
    "latitude": 20.89815,
    "longitude": -99.71138
  },
  {
    "latitude": 20.89834,
    "longitude": -99.71008
  },
  {
    "latitude": 20.89767,
    "longitude": -99.70856
  },
  {
    "latitude": 20.89718,
    "longitude": -99.70877
  },
  {
    "latitude": 20.89732,
    "longitude": -99.7097
  },
  {
    "latitude": 20.89671,
    "longitude": -99.70992
  },
  {
    "latitude": 20.89643,
    "longitude": -99.70898
  },
  {
    "latitude": 20.89484,
    "longitude": -99.7086
  },
  {
    "latitude": 20.89379,
    "longitude": -99.70891
  },
  {
    "latitude": 20.89269,
    "longitude": -99.7081
  },
  {
    "latitude": 20.89107,
    "longitude": -99.70922
  },
  {
    "latitude": 20.8907,
    "longitude": -99.71027
  },
  {
    "latitude": 20.89024,
    "longitude": -99.71041
  },
  {
    "latitude": 20.88691,
    "longitude": -99.70924
  },
  {
    "latitude": 20.88599,
    "longitude": -99.7079
  },
  {
    "latitude": 20.88336,
    "longitude": -99.70639
  },
  {
    "latitude": 20.87342,
    "longitude": -99.70824
  },
  {
    "latitude": 20.86761,
    "longitude": -99.71131
  },
  {
    "latitude": 20.86711,
    "longitude": -99.71111
  },
  {
    "latitude": 20.86649,
    "longitude": -99.70992
  },
  {
    "latitude": 20.8658,
    "longitude": -99.70972
  },
  {
    "latitude": 20.84784,
    "longitude": -99.71318
  },
  {
    "latitude": 20.83413,
    "longitude": -99.71934
  },
  {
    "latitude": 20.83284,
    "longitude": -99.71639
  },
  {
    "latitude": 20.83256,
    "longitude": -99.71958
  },
  {
    "latitude": 20.78998,
    "longitude": -99.72443
  },
  {
    "latitude": 20.78894,
    "longitude": -99.72409
  },
  {
    "latitude": 20.78536,
    "longitude": -99.72137
  },
  {
    "latitude": 20.77997,
    "longitude": -99.72087
  },
  {
    "latitude": 20.7762,
    "longitude": -99.72194
  },
  {
    "latitude": 20.76324,
    "longitude": -99.72094
  },
  {
    "latitude": 20.73952,
    "longitude": -99.71508
  },
  {
    "latitude": 20.73696,
    "longitude": -99.71507
  },
  {
    "latitude": 20.73319,
    "longitude": -99.71441
  },
  {
    "latitude": 20.73049,
    "longitude": -99.71162
  },
  {
    "latitude": 20.72392,
    "longitude": -99.71007
  },
  {
    "latitude": 20.71632,
    "longitude": -99.71062
  },
  {
    "latitude": 20.71448,
    "longitude": -99.71112
  },
  {
    "latitude": 20.70934,
    "longitude": -99.71451
  },
  {
    "latitude": 20.69685,
    "longitude": -99.72761
  },
  {
    "latitude": 20.69645,
    "longitude": -99.7292
  },
  {
    "latitude": 20.70397,
    "longitude": -99.79202
  },
  {
    "latitude": 20.70094,
    "longitude": -99.81215
  },
  {
    "latitude": 20.70095,
    "longitude": -99.8142
  },
  {
    "latitude": 20.69594,
    "longitude": -99.81567
  },
  {
    "latitude": 20.69738,
    "longitude": -99.81834
  },
  {
    "latitude": 20.69533,
    "longitude": -99.8188
  },
  {
    "latitude": 20.69609,
    "longitude": -99.82193
  },
  {
    "latitude": 20.6983,
    "longitude": -99.82565
  },
  {
    "latitude": 20.69814,
    "longitude": -99.83385
  },
  {
    "latitude": 20.69851,
    "longitude": -99.83736
  },
  {
    "latitude": 20.69942,
    "longitude": -99.84042
  },
  {
    "latitude": 20.69887,
    "longitude": -99.84405
  },
  {
    "latitude": 20.70007,
    "longitude": -99.85517
  },
  {
    "latitude": 20.69952,
    "longitude": -99.86097
  },
  {
    "latitude": 20.69822,
    "longitude": -99.86578
  },
  {
    "latitude": 20.69795,
    "longitude": -99.86857
  },
  {
    "latitude": 20.69742,
    "longitude": -99.86953
  },
  {
    "latitude": 20.69665,
    "longitude": -99.87719
  },
  {
    "latitude": 20.6691,
    "longitude": -99.89706
  },
  {
    "latitude": 20.66677,
    "longitude": -99.89734
  },
  {
    "latitude": 20.6665,
    "longitude": -99.89663
  },
  {
    "latitude": 20.66692,
    "longitude": -99.89596
  },
  {
    "latitude": 20.6671,
    "longitude": -99.89727
  },
  {
    "latitude": 20.66538,
    "longitude": -99.89799
  },
  {
    "latitude": 20.67049,
    "longitude": -99.91088
  },
  {
    "latitude": 20.69875,
    "longitude": -99.96788
  },
  {
    "latitude": 20.70654,
    "longitude": -99.98403
  },
  {
    "latitude": 20.7066,
    "longitude": -99.98519
  },
  {
    "latitude": 20.66727,
    "longitude": -100.05723
  },
  {
    "latitude": 20.66647,
    "longitude": -100.06121
  },
  {
    "latitude": 20.66633,
    "longitude": -100.09047
  },
  {
    "latitude": 20.66547,
    "longitude": -100.09324
  },
  {
    "latitude": 20.66166,
    "longitude": -100.09786
  },
  {
    "latitude": 20.65958,
    "longitude": -100.09919
  },
  {
    "latitude": 20.658,
    "longitude": -100.09945
  },
  {
    "latitude": 20.64692,
    "longitude": -100.09909
  },
  {
    "latitude": 20.64515,
    "longitude": -100.10003
  },
  {
    "latitude": 20.61647,
    "longitude": -100.14158
  },
  {
    "latitude": 20.61603,
    "longitude": -100.1433
  },
  {
    "latitude": 20.61684,
    "longitude": -100.15068
  },
  {
    "latitude": 20.61619,
    "longitude": -100.15292
  },
  {
    "latitude": 20.55941,
    "longitude": -100.22541
  },
  {
    "latitude": 20.56461,
    "longitude": -100.24412
  },
  {
    "latitude": 20.57194,
    "longitude": -100.25801
  },
  {
    "latitude": 20.57117,
    "longitude": -100.29303
  },
  {
    "latitude": 20.56965,
    "longitude": -100.30121
  },
  {
    "latitude": 20.57002,
    "longitude": -100.3109
  },
  {
    "latitude": 20.57245,
    "longitude": -100.32108
  },
  {
    "latitude": 20.57558,
    "longitude": -100.33005
  },
  {
    "latitude": 20.57592,
    "longitude": -100.33634
  },
  {
    "latitude": 20.57845,
    "longitude": -100.34079
  },
  {
    "latitude": 20.58004,
    "longitude": -100.34253
  },
  {
    "latitude": 20.58161,
    "longitude": -100.34311
  },
  {
    "latitude": 20.58465,
    "longitude": -100.34307
  },
  {
    "latitude": 20.58673,
    "longitude": -100.34439
  },
  {
    "latitude": 20.5876,
    "longitude": -100.34641
  },
  {
    "latitude": 20.58812,
    "longitude": -100.35085
  },
  {
    "latitude": 20.58814,
    "longitude": -100.3523
  },
  {
    "latitude": 20.58728,
    "longitude": -100.35414
  },
  {
    "latitude": 20.58441,
    "longitude": -100.35583
  },
  {
    "latitude": 20.58294,
    "longitude": -100.35801
  },
  {
    "latitude": 20.57766,
    "longitude": -100.38392
  },
  {
    "latitude": 20.57773,
    "longitude": -100.38559
  },
  {
    "latitude": 20.59026,
    "longitude": -100.39046
  },
  {
    "latitude": 20.59007,
    "longitude": -100.39103
  },
  {
    "latitude": 20.58868,
    "longitude": -100.39035
  },
  {
    "latitude": 20.58883,
    "longitude": -100.38991
  }
];

// 3. Carretera Federal 69: Rioverde <-> Jalpan de Serra (204 puntos)
export const REAL_RIOVERDE_JALPAN_HIGHWAY: Coordinate[] = [
  {
    "latitude": 21.93336,
    "longitude": -99.9917
  },
  {
    "latitude": 21.93335,
    "longitude": -99.99142
  },
  {
    "latitude": 21.93153,
    "longitude": -99.99169
  },
  {
    "latitude": 21.93143,
    "longitude": -99.99121
  },
  {
    "latitude": 21.92716,
    "longitude": -99.99162
  },
  {
    "latitude": 21.92721,
    "longitude": -99.99308
  },
  {
    "latitude": 21.92156,
    "longitude": -99.99397
  },
  {
    "latitude": 21.91266,
    "longitude": -99.98585
  },
  {
    "latitude": 21.87039,
    "longitude": -99.97199
  },
  {
    "latitude": 21.80728,
    "longitude": -99.93617
  },
  {
    "latitude": 21.79314,
    "longitude": -99.92415
  },
  {
    "latitude": 21.7914,
    "longitude": -99.92393
  },
  {
    "latitude": 21.7862,
    "longitude": -99.92629
  },
  {
    "latitude": 21.78527,
    "longitude": -99.92616
  },
  {
    "latitude": 21.77285,
    "longitude": -99.9115
  },
  {
    "latitude": 21.76233,
    "longitude": -99.90592
  },
  {
    "latitude": 21.73196,
    "longitude": -99.88476
  },
  {
    "latitude": 21.72956,
    "longitude": -99.88201
  },
  {
    "latitude": 21.7283,
    "longitude": -99.8816
  },
  {
    "latitude": 21.72453,
    "longitude": -99.88256
  },
  {
    "latitude": 21.71805,
    "longitude": -99.88089
  },
  {
    "latitude": 21.71599,
    "longitude": -99.8787
  },
  {
    "latitude": 21.6984,
    "longitude": -99.85541
  },
  {
    "latitude": 21.66086,
    "longitude": -99.82681
  },
  {
    "latitude": 21.65638,
    "longitude": -99.82224
  },
  {
    "latitude": 21.6492,
    "longitude": -99.81911
  },
  {
    "latitude": 21.65184,
    "longitude": -99.81277
  },
  {
    "latitude": 21.65024,
    "longitude": -99.8114
  },
  {
    "latitude": 21.64819,
    "longitude": -99.80877
  },
  {
    "latitude": 21.64701,
    "longitude": -99.80658
  },
  {
    "latitude": 21.64676,
    "longitude": -99.80417
  },
  {
    "latitude": 21.64741,
    "longitude": -99.80357
  },
  {
    "latitude": 21.64867,
    "longitude": -99.80382
  },
  {
    "latitude": 21.64984,
    "longitude": -99.80315
  },
  {
    "latitude": 21.65131,
    "longitude": -99.80361
  },
  {
    "latitude": 21.65236,
    "longitude": -99.80258
  },
  {
    "latitude": 21.65525,
    "longitude": -99.80148
  },
  {
    "latitude": 21.65627,
    "longitude": -99.80043
  },
  {
    "latitude": 21.65649,
    "longitude": -99.79923
  },
  {
    "latitude": 21.65535,
    "longitude": -99.79219
  },
  {
    "latitude": 21.65341,
    "longitude": -99.7905
  },
  {
    "latitude": 21.6511,
    "longitude": -99.7867
  },
  {
    "latitude": 21.6493,
    "longitude": -99.77977
  },
  {
    "latitude": 21.64716,
    "longitude": -99.778
  },
  {
    "latitude": 21.64414,
    "longitude": -99.77222
  },
  {
    "latitude": 21.63978,
    "longitude": -99.77012
  },
  {
    "latitude": 21.63313,
    "longitude": -99.76601
  },
  {
    "latitude": 21.62996,
    "longitude": -99.76152
  },
  {
    "latitude": 21.62922,
    "longitude": -99.75823
  },
  {
    "latitude": 21.62739,
    "longitude": -99.75382
  },
  {
    "latitude": 21.62159,
    "longitude": -99.74924
  },
  {
    "latitude": 21.61949,
    "longitude": -99.74704
  },
  {
    "latitude": 21.55396,
    "longitude": -99.7003
  },
  {
    "latitude": 21.54782,
    "longitude": -99.69406
  },
  {
    "latitude": 21.54898,
    "longitude": -99.69288
  },
  {
    "latitude": 21.5492,
    "longitude": -99.69221
  },
  {
    "latitude": 21.5488,
    "longitude": -99.69109
  },
  {
    "latitude": 21.55006,
    "longitude": -99.68932
  },
  {
    "latitude": 21.54885,
    "longitude": -99.68882
  },
  {
    "latitude": 21.54819,
    "longitude": -99.68977
  },
  {
    "latitude": 21.54779,
    "longitude": -99.68949
  },
  {
    "latitude": 21.54672,
    "longitude": -99.69295
  },
  {
    "latitude": 21.53586,
    "longitude": -99.68223
  },
  {
    "latitude": 21.53079,
    "longitude": -99.68091
  },
  {
    "latitude": 21.52747,
    "longitude": -99.67847
  },
  {
    "latitude": 21.5245,
    "longitude": -99.67793
  },
  {
    "latitude": 21.52251,
    "longitude": -99.67806
  },
  {
    "latitude": 21.52136,
    "longitude": -99.67701
  },
  {
    "latitude": 21.52014,
    "longitude": -99.6766
  },
  {
    "latitude": 21.51887,
    "longitude": -99.67533
  },
  {
    "latitude": 21.51749,
    "longitude": -99.67515
  },
  {
    "latitude": 21.51558,
    "longitude": -99.67341
  },
  {
    "latitude": 21.51533,
    "longitude": -99.67274
  },
  {
    "latitude": 21.51556,
    "longitude": -99.67152
  },
  {
    "latitude": 21.51736,
    "longitude": -99.66948
  },
  {
    "latitude": 21.51705,
    "longitude": -99.66883
  },
  {
    "latitude": 21.51424,
    "longitude": -99.66965
  },
  {
    "latitude": 21.51246,
    "longitude": -99.6692
  },
  {
    "latitude": 21.51167,
    "longitude": -99.67023
  },
  {
    "latitude": 21.51052,
    "longitude": -99.66972
  },
  {
    "latitude": 21.50828,
    "longitude": -99.6696
  },
  {
    "latitude": 21.47665,
    "longitude": -99.64568
  },
  {
    "latitude": 21.47273,
    "longitude": -99.64449
  },
  {
    "latitude": 21.47245,
    "longitude": -99.64395
  },
  {
    "latitude": 21.47255,
    "longitude": -99.6408
  },
  {
    "latitude": 21.46944,
    "longitude": -99.64136
  },
  {
    "latitude": 21.46342,
    "longitude": -99.63808
  },
  {
    "latitude": 21.4627,
    "longitude": -99.63593
  },
  {
    "latitude": 21.45951,
    "longitude": -99.63596
  },
  {
    "latitude": 21.45181,
    "longitude": -99.6328
  },
  {
    "latitude": 21.43819,
    "longitude": -99.62122
  },
  {
    "latitude": 21.43854,
    "longitude": -99.62201
  },
  {
    "latitude": 21.43795,
    "longitude": -99.62375
  },
  {
    "latitude": 21.43829,
    "longitude": -99.62651
  },
  {
    "latitude": 21.43532,
    "longitude": -99.62892
  },
  {
    "latitude": 21.43283,
    "longitude": -99.62593
  },
  {
    "latitude": 21.43349,
    "longitude": -99.62323
  },
  {
    "latitude": 21.43328,
    "longitude": -99.62135
  },
  {
    "latitude": 21.43218,
    "longitude": -99.61848
  },
  {
    "latitude": 21.43194,
    "longitude": -99.61587
  },
  {
    "latitude": 21.42742,
    "longitude": -99.61202
  },
  {
    "latitude": 21.42129,
    "longitude": -99.60801
  },
  {
    "latitude": 21.41662,
    "longitude": -99.60369
  },
  {
    "latitude": 21.41519,
    "longitude": -99.60179
  },
  {
    "latitude": 21.41156,
    "longitude": -99.59888
  },
  {
    "latitude": 21.40851,
    "longitude": -99.59522
  },
  {
    "latitude": 21.40488,
    "longitude": -99.59403
  },
  {
    "latitude": 21.39838,
    "longitude": -99.58506
  },
  {
    "latitude": 21.39681,
    "longitude": -99.58192
  },
  {
    "latitude": 21.39559,
    "longitude": -99.58143
  },
  {
    "latitude": 21.39376,
    "longitude": -99.58187
  },
  {
    "latitude": 21.39136,
    "longitude": -99.5816
  },
  {
    "latitude": 21.39052,
    "longitude": -99.58276
  },
  {
    "latitude": 21.38842,
    "longitude": -99.58215
  },
  {
    "latitude": 21.38551,
    "longitude": -99.58256
  },
  {
    "latitude": 21.38327,
    "longitude": -99.58202
  },
  {
    "latitude": 21.37857,
    "longitude": -99.5785
  },
  {
    "latitude": 21.37739,
    "longitude": -99.57708
  },
  {
    "latitude": 21.3747,
    "longitude": -99.57581
  },
  {
    "latitude": 21.37396,
    "longitude": -99.57413
  },
  {
    "latitude": 21.3675,
    "longitude": -99.56976
  },
  {
    "latitude": 21.36534,
    "longitude": -99.56664
  },
  {
    "latitude": 21.36299,
    "longitude": -99.56445
  },
  {
    "latitude": 21.36061,
    "longitude": -99.56043
  },
  {
    "latitude": 21.35997,
    "longitude": -99.55771
  },
  {
    "latitude": 21.36061,
    "longitude": -99.5559
  },
  {
    "latitude": 21.35868,
    "longitude": -99.55516
  },
  {
    "latitude": 21.35589,
    "longitude": -99.55584
  },
  {
    "latitude": 21.35506,
    "longitude": -99.55539
  },
  {
    "latitude": 21.35474,
    "longitude": -99.5543
  },
  {
    "latitude": 21.35492,
    "longitude": -99.55104
  },
  {
    "latitude": 21.35348,
    "longitude": -99.54964
  },
  {
    "latitude": 21.35223,
    "longitude": -99.54936
  },
  {
    "latitude": 21.34862,
    "longitude": -99.55026
  },
  {
    "latitude": 21.34761,
    "longitude": -99.54979
  },
  {
    "latitude": 21.3472,
    "longitude": -99.54877
  },
  {
    "latitude": 21.34781,
    "longitude": -99.54555
  },
  {
    "latitude": 21.34741,
    "longitude": -99.54452
  },
  {
    "latitude": 21.34504,
    "longitude": -99.54284
  },
  {
    "latitude": 21.34362,
    "longitude": -99.53992
  },
  {
    "latitude": 21.34215,
    "longitude": -99.53872
  },
  {
    "latitude": 21.33902,
    "longitude": -99.53482
  },
  {
    "latitude": 21.33721,
    "longitude": -99.53385
  },
  {
    "latitude": 21.33604,
    "longitude": -99.53271
  },
  {
    "latitude": 21.33389,
    "longitude": -99.53176
  },
  {
    "latitude": 21.33348,
    "longitude": -99.53077
  },
  {
    "latitude": 21.33349,
    "longitude": -99.52877
  },
  {
    "latitude": 21.33109,
    "longitude": -99.52552
  },
  {
    "latitude": 21.33076,
    "longitude": -99.52362
  },
  {
    "latitude": 21.32957,
    "longitude": -99.52184
  },
  {
    "latitude": 21.32748,
    "longitude": -99.52079
  },
  {
    "latitude": 21.32575,
    "longitude": -99.5207
  },
  {
    "latitude": 21.32461,
    "longitude": -99.52002
  },
  {
    "latitude": 21.32097,
    "longitude": -99.51526
  },
  {
    "latitude": 21.31546,
    "longitude": -99.5131
  },
  {
    "latitude": 21.31177,
    "longitude": -99.51336
  },
  {
    "latitude": 21.30983,
    "longitude": -99.51309
  },
  {
    "latitude": 21.30276,
    "longitude": -99.50993
  },
  {
    "latitude": 21.30089,
    "longitude": -99.51105
  },
  {
    "latitude": 21.30017,
    "longitude": -99.5092
  },
  {
    "latitude": 21.29963,
    "longitude": -99.50885
  },
  {
    "latitude": 21.29443,
    "longitude": -99.51149
  },
  {
    "latitude": 21.29372,
    "longitude": -99.51023
  },
  {
    "latitude": 21.29201,
    "longitude": -99.50959
  },
  {
    "latitude": 21.29133,
    "longitude": -99.50768
  },
  {
    "latitude": 21.28897,
    "longitude": -99.50831
  },
  {
    "latitude": 21.28725,
    "longitude": -99.50748
  },
  {
    "latitude": 21.28571,
    "longitude": -99.50773
  },
  {
    "latitude": 21.28476,
    "longitude": -99.50967
  },
  {
    "latitude": 21.2842,
    "longitude": -99.50989
  },
  {
    "latitude": 21.28287,
    "longitude": -99.50761
  },
  {
    "latitude": 21.28254,
    "longitude": -99.50465
  },
  {
    "latitude": 21.28133,
    "longitude": -99.5035
  },
  {
    "latitude": 21.28212,
    "longitude": -99.50215
  },
  {
    "latitude": 21.28083,
    "longitude": -99.50098
  },
  {
    "latitude": 21.27899,
    "longitude": -99.50031
  },
  {
    "latitude": 21.27945,
    "longitude": -99.4981
  },
  {
    "latitude": 21.27717,
    "longitude": -99.49675
  },
  {
    "latitude": 21.27677,
    "longitude": -99.49433
  },
  {
    "latitude": 21.27372,
    "longitude": -99.49383
  },
  {
    "latitude": 21.2658,
    "longitude": -99.49128
  },
  {
    "latitude": 21.26278,
    "longitude": -99.49171
  },
  {
    "latitude": 21.26096,
    "longitude": -99.49065
  },
  {
    "latitude": 21.26052,
    "longitude": -99.48953
  },
  {
    "latitude": 21.25943,
    "longitude": -99.48845
  },
  {
    "latitude": 21.2573,
    "longitude": -99.48809
  },
  {
    "latitude": 21.25349,
    "longitude": -99.48638
  },
  {
    "latitude": 21.25256,
    "longitude": -99.48478
  },
  {
    "latitude": 21.24302,
    "longitude": -99.48352
  },
  {
    "latitude": 21.23859,
    "longitude": -99.48216
  },
  {
    "latitude": 21.23712,
    "longitude": -99.48054
  },
  {
    "latitude": 21.2355,
    "longitude": -99.48021
  },
  {
    "latitude": 21.23447,
    "longitude": -99.47935
  },
  {
    "latitude": 21.23196,
    "longitude": -99.47953
  },
  {
    "latitude": 21.23047,
    "longitude": -99.47839
  },
  {
    "latitude": 21.22919,
    "longitude": -99.47887
  },
  {
    "latitude": 21.22745,
    "longitude": -99.47781
  },
  {
    "latitude": 21.22052,
    "longitude": -99.47565
  },
  {
    "latitude": 21.22013,
    "longitude": -99.47542
  },
  {
    "latitude": 21.22019,
    "longitude": -99.47495
  },
  {
    "latitude": 21.21824,
    "longitude": -99.47347
  },
  {
    "latitude": 21.21823,
    "longitude": -99.47241
  },
  {
    "latitude": 21.21688,
    "longitude": -99.4714
  },
  {
    "latitude": 21.21721,
    "longitude": -99.47075
  }
];

// 4. Ruta Combinada: Rioverde <-> Jalpan de Serra <-> Xilitla (474 puntos)
export const REAL_RIOVERDE_JALPAN_XILITLA_HIGHWAY: Coordinate[] = [
  {
    "latitude": 21.93336,
    "longitude": -99.9917
  },
  {
    "latitude": 21.93335,
    "longitude": -99.99142
  },
  {
    "latitude": 21.93153,
    "longitude": -99.99169
  },
  {
    "latitude": 21.93143,
    "longitude": -99.99121
  },
  {
    "latitude": 21.92716,
    "longitude": -99.99162
  },
  {
    "latitude": 21.92721,
    "longitude": -99.99308
  },
  {
    "latitude": 21.92156,
    "longitude": -99.99397
  },
  {
    "latitude": 21.91266,
    "longitude": -99.98585
  },
  {
    "latitude": 21.87039,
    "longitude": -99.97199
  },
  {
    "latitude": 21.80728,
    "longitude": -99.93617
  },
  {
    "latitude": 21.79314,
    "longitude": -99.92415
  },
  {
    "latitude": 21.7914,
    "longitude": -99.92393
  },
  {
    "latitude": 21.7862,
    "longitude": -99.92629
  },
  {
    "latitude": 21.78527,
    "longitude": -99.92616
  },
  {
    "latitude": 21.77285,
    "longitude": -99.9115
  },
  {
    "latitude": 21.76233,
    "longitude": -99.90592
  },
  {
    "latitude": 21.73196,
    "longitude": -99.88476
  },
  {
    "latitude": 21.72956,
    "longitude": -99.88201
  },
  {
    "latitude": 21.7283,
    "longitude": -99.8816
  },
  {
    "latitude": 21.72453,
    "longitude": -99.88256
  },
  {
    "latitude": 21.71805,
    "longitude": -99.88089
  },
  {
    "latitude": 21.71599,
    "longitude": -99.8787
  },
  {
    "latitude": 21.6984,
    "longitude": -99.85541
  },
  {
    "latitude": 21.66086,
    "longitude": -99.82681
  },
  {
    "latitude": 21.65638,
    "longitude": -99.82224
  },
  {
    "latitude": 21.6492,
    "longitude": -99.81911
  },
  {
    "latitude": 21.65184,
    "longitude": -99.81277
  },
  {
    "latitude": 21.65024,
    "longitude": -99.8114
  },
  {
    "latitude": 21.64819,
    "longitude": -99.80877
  },
  {
    "latitude": 21.64701,
    "longitude": -99.80658
  },
  {
    "latitude": 21.64676,
    "longitude": -99.80417
  },
  {
    "latitude": 21.64741,
    "longitude": -99.80357
  },
  {
    "latitude": 21.64867,
    "longitude": -99.80382
  },
  {
    "latitude": 21.64984,
    "longitude": -99.80315
  },
  {
    "latitude": 21.65131,
    "longitude": -99.80361
  },
  {
    "latitude": 21.65236,
    "longitude": -99.80258
  },
  {
    "latitude": 21.65525,
    "longitude": -99.80148
  },
  {
    "latitude": 21.65627,
    "longitude": -99.80043
  },
  {
    "latitude": 21.65649,
    "longitude": -99.79923
  },
  {
    "latitude": 21.65535,
    "longitude": -99.79219
  },
  {
    "latitude": 21.65341,
    "longitude": -99.7905
  },
  {
    "latitude": 21.6511,
    "longitude": -99.7867
  },
  {
    "latitude": 21.6493,
    "longitude": -99.77977
  },
  {
    "latitude": 21.64716,
    "longitude": -99.778
  },
  {
    "latitude": 21.64414,
    "longitude": -99.77222
  },
  {
    "latitude": 21.63978,
    "longitude": -99.77012
  },
  {
    "latitude": 21.63313,
    "longitude": -99.76601
  },
  {
    "latitude": 21.62996,
    "longitude": -99.76152
  },
  {
    "latitude": 21.62922,
    "longitude": -99.75823
  },
  {
    "latitude": 21.62739,
    "longitude": -99.75382
  },
  {
    "latitude": 21.62159,
    "longitude": -99.74924
  },
  {
    "latitude": 21.61949,
    "longitude": -99.74704
  },
  {
    "latitude": 21.55396,
    "longitude": -99.7003
  },
  {
    "latitude": 21.54782,
    "longitude": -99.69406
  },
  {
    "latitude": 21.54898,
    "longitude": -99.69288
  },
  {
    "latitude": 21.5492,
    "longitude": -99.69221
  },
  {
    "latitude": 21.5488,
    "longitude": -99.69109
  },
  {
    "latitude": 21.55006,
    "longitude": -99.68932
  },
  {
    "latitude": 21.54885,
    "longitude": -99.68882
  },
  {
    "latitude": 21.54819,
    "longitude": -99.68977
  },
  {
    "latitude": 21.54779,
    "longitude": -99.68949
  },
  {
    "latitude": 21.54672,
    "longitude": -99.69295
  },
  {
    "latitude": 21.53586,
    "longitude": -99.68223
  },
  {
    "latitude": 21.53079,
    "longitude": -99.68091
  },
  {
    "latitude": 21.52747,
    "longitude": -99.67847
  },
  {
    "latitude": 21.5245,
    "longitude": -99.67793
  },
  {
    "latitude": 21.52251,
    "longitude": -99.67806
  },
  {
    "latitude": 21.52136,
    "longitude": -99.67701
  },
  {
    "latitude": 21.52014,
    "longitude": -99.6766
  },
  {
    "latitude": 21.51887,
    "longitude": -99.67533
  },
  {
    "latitude": 21.51749,
    "longitude": -99.67515
  },
  {
    "latitude": 21.51558,
    "longitude": -99.67341
  },
  {
    "latitude": 21.51533,
    "longitude": -99.67274
  },
  {
    "latitude": 21.51556,
    "longitude": -99.67152
  },
  {
    "latitude": 21.51736,
    "longitude": -99.66948
  },
  {
    "latitude": 21.51705,
    "longitude": -99.66883
  },
  {
    "latitude": 21.51424,
    "longitude": -99.66965
  },
  {
    "latitude": 21.51246,
    "longitude": -99.6692
  },
  {
    "latitude": 21.51167,
    "longitude": -99.67023
  },
  {
    "latitude": 21.51052,
    "longitude": -99.66972
  },
  {
    "latitude": 21.50828,
    "longitude": -99.6696
  },
  {
    "latitude": 21.47665,
    "longitude": -99.64568
  },
  {
    "latitude": 21.47273,
    "longitude": -99.64449
  },
  {
    "latitude": 21.47245,
    "longitude": -99.64395
  },
  {
    "latitude": 21.47255,
    "longitude": -99.6408
  },
  {
    "latitude": 21.46944,
    "longitude": -99.64136
  },
  {
    "latitude": 21.46342,
    "longitude": -99.63808
  },
  {
    "latitude": 21.4627,
    "longitude": -99.63593
  },
  {
    "latitude": 21.45951,
    "longitude": -99.63596
  },
  {
    "latitude": 21.45181,
    "longitude": -99.6328
  },
  {
    "latitude": 21.43819,
    "longitude": -99.62122
  },
  {
    "latitude": 21.43854,
    "longitude": -99.62201
  },
  {
    "latitude": 21.43795,
    "longitude": -99.62375
  },
  {
    "latitude": 21.43829,
    "longitude": -99.62651
  },
  {
    "latitude": 21.43532,
    "longitude": -99.62892
  },
  {
    "latitude": 21.43283,
    "longitude": -99.62593
  },
  {
    "latitude": 21.43349,
    "longitude": -99.62323
  },
  {
    "latitude": 21.43328,
    "longitude": -99.62135
  },
  {
    "latitude": 21.43218,
    "longitude": -99.61848
  },
  {
    "latitude": 21.43194,
    "longitude": -99.61587
  },
  {
    "latitude": 21.42742,
    "longitude": -99.61202
  },
  {
    "latitude": 21.42129,
    "longitude": -99.60801
  },
  {
    "latitude": 21.41662,
    "longitude": -99.60369
  },
  {
    "latitude": 21.41519,
    "longitude": -99.60179
  },
  {
    "latitude": 21.41156,
    "longitude": -99.59888
  },
  {
    "latitude": 21.40851,
    "longitude": -99.59522
  },
  {
    "latitude": 21.40488,
    "longitude": -99.59403
  },
  {
    "latitude": 21.39838,
    "longitude": -99.58506
  },
  {
    "latitude": 21.39681,
    "longitude": -99.58192
  },
  {
    "latitude": 21.39559,
    "longitude": -99.58143
  },
  {
    "latitude": 21.39376,
    "longitude": -99.58187
  },
  {
    "latitude": 21.39136,
    "longitude": -99.5816
  },
  {
    "latitude": 21.39052,
    "longitude": -99.58276
  },
  {
    "latitude": 21.38842,
    "longitude": -99.58215
  },
  {
    "latitude": 21.38551,
    "longitude": -99.58256
  },
  {
    "latitude": 21.38327,
    "longitude": -99.58202
  },
  {
    "latitude": 21.37857,
    "longitude": -99.5785
  },
  {
    "latitude": 21.37739,
    "longitude": -99.57708
  },
  {
    "latitude": 21.3747,
    "longitude": -99.57581
  },
  {
    "latitude": 21.37396,
    "longitude": -99.57413
  },
  {
    "latitude": 21.3675,
    "longitude": -99.56976
  },
  {
    "latitude": 21.36534,
    "longitude": -99.56664
  },
  {
    "latitude": 21.36299,
    "longitude": -99.56445
  },
  {
    "latitude": 21.36061,
    "longitude": -99.56043
  },
  {
    "latitude": 21.35997,
    "longitude": -99.55771
  },
  {
    "latitude": 21.36061,
    "longitude": -99.5559
  },
  {
    "latitude": 21.35868,
    "longitude": -99.55516
  },
  {
    "latitude": 21.35589,
    "longitude": -99.55584
  },
  {
    "latitude": 21.35506,
    "longitude": -99.55539
  },
  {
    "latitude": 21.35474,
    "longitude": -99.5543
  },
  {
    "latitude": 21.35492,
    "longitude": -99.55104
  },
  {
    "latitude": 21.35348,
    "longitude": -99.54964
  },
  {
    "latitude": 21.35223,
    "longitude": -99.54936
  },
  {
    "latitude": 21.34862,
    "longitude": -99.55026
  },
  {
    "latitude": 21.34761,
    "longitude": -99.54979
  },
  {
    "latitude": 21.3472,
    "longitude": -99.54877
  },
  {
    "latitude": 21.34781,
    "longitude": -99.54555
  },
  {
    "latitude": 21.34741,
    "longitude": -99.54452
  },
  {
    "latitude": 21.34504,
    "longitude": -99.54284
  },
  {
    "latitude": 21.34362,
    "longitude": -99.53992
  },
  {
    "latitude": 21.34215,
    "longitude": -99.53872
  },
  {
    "latitude": 21.33902,
    "longitude": -99.53482
  },
  {
    "latitude": 21.33721,
    "longitude": -99.53385
  },
  {
    "latitude": 21.33604,
    "longitude": -99.53271
  },
  {
    "latitude": 21.33389,
    "longitude": -99.53176
  },
  {
    "latitude": 21.33348,
    "longitude": -99.53077
  },
  {
    "latitude": 21.33349,
    "longitude": -99.52877
  },
  {
    "latitude": 21.33109,
    "longitude": -99.52552
  },
  {
    "latitude": 21.33076,
    "longitude": -99.52362
  },
  {
    "latitude": 21.32957,
    "longitude": -99.52184
  },
  {
    "latitude": 21.32748,
    "longitude": -99.52079
  },
  {
    "latitude": 21.32575,
    "longitude": -99.5207
  },
  {
    "latitude": 21.32461,
    "longitude": -99.52002
  },
  {
    "latitude": 21.32097,
    "longitude": -99.51526
  },
  {
    "latitude": 21.31546,
    "longitude": -99.5131
  },
  {
    "latitude": 21.31177,
    "longitude": -99.51336
  },
  {
    "latitude": 21.30983,
    "longitude": -99.51309
  },
  {
    "latitude": 21.30276,
    "longitude": -99.50993
  },
  {
    "latitude": 21.30089,
    "longitude": -99.51105
  },
  {
    "latitude": 21.30017,
    "longitude": -99.5092
  },
  {
    "latitude": 21.29963,
    "longitude": -99.50885
  },
  {
    "latitude": 21.29443,
    "longitude": -99.51149
  },
  {
    "latitude": 21.29372,
    "longitude": -99.51023
  },
  {
    "latitude": 21.29201,
    "longitude": -99.50959
  },
  {
    "latitude": 21.29133,
    "longitude": -99.50768
  },
  {
    "latitude": 21.28897,
    "longitude": -99.50831
  },
  {
    "latitude": 21.28725,
    "longitude": -99.50748
  },
  {
    "latitude": 21.28571,
    "longitude": -99.50773
  },
  {
    "latitude": 21.28476,
    "longitude": -99.50967
  },
  {
    "latitude": 21.2842,
    "longitude": -99.50989
  },
  {
    "latitude": 21.28287,
    "longitude": -99.50761
  },
  {
    "latitude": 21.28254,
    "longitude": -99.50465
  },
  {
    "latitude": 21.28133,
    "longitude": -99.5035
  },
  {
    "latitude": 21.28212,
    "longitude": -99.50215
  },
  {
    "latitude": 21.28083,
    "longitude": -99.50098
  },
  {
    "latitude": 21.27899,
    "longitude": -99.50031
  },
  {
    "latitude": 21.27945,
    "longitude": -99.4981
  },
  {
    "latitude": 21.27717,
    "longitude": -99.49675
  },
  {
    "latitude": 21.27677,
    "longitude": -99.49433
  },
  {
    "latitude": 21.27372,
    "longitude": -99.49383
  },
  {
    "latitude": 21.2658,
    "longitude": -99.49128
  },
  {
    "latitude": 21.26278,
    "longitude": -99.49171
  },
  {
    "latitude": 21.26096,
    "longitude": -99.49065
  },
  {
    "latitude": 21.26052,
    "longitude": -99.48953
  },
  {
    "latitude": 21.25943,
    "longitude": -99.48845
  },
  {
    "latitude": 21.2573,
    "longitude": -99.48809
  },
  {
    "latitude": 21.25349,
    "longitude": -99.48638
  },
  {
    "latitude": 21.25256,
    "longitude": -99.48478
  },
  {
    "latitude": 21.24302,
    "longitude": -99.48352
  },
  {
    "latitude": 21.23859,
    "longitude": -99.48216
  },
  {
    "latitude": 21.23712,
    "longitude": -99.48054
  },
  {
    "latitude": 21.2355,
    "longitude": -99.48021
  },
  {
    "latitude": 21.23447,
    "longitude": -99.47935
  },
  {
    "latitude": 21.23196,
    "longitude": -99.47953
  },
  {
    "latitude": 21.23047,
    "longitude": -99.47839
  },
  {
    "latitude": 21.22919,
    "longitude": -99.47887
  },
  {
    "latitude": 21.22745,
    "longitude": -99.47781
  },
  {
    "latitude": 21.22052,
    "longitude": -99.47565
  },
  {
    "latitude": 21.22013,
    "longitude": -99.47542
  },
  {
    "latitude": 21.22019,
    "longitude": -99.47495
  },
  {
    "latitude": 21.21824,
    "longitude": -99.47347
  },
  {
    "latitude": 21.21823,
    "longitude": -99.47241
  },
  {
    "latitude": 21.21688,
    "longitude": -99.4714
  },
  {
    "latitude": 21.21721,
    "longitude": -99.47075
  },
  {
    "latitude": 21.21688,
    "longitude": -99.4714
  },
  {
    "latitude": 21.21644,
    "longitude": -99.47133
  },
  {
    "latitude": 21.21587,
    "longitude": -99.47191
  },
  {
    "latitude": 21.21433,
    "longitude": -99.47127
  },
  {
    "latitude": 21.21454,
    "longitude": -99.46904
  },
  {
    "latitude": 21.21589,
    "longitude": -99.46755
  },
  {
    "latitude": 21.21579,
    "longitude": -99.46452
  },
  {
    "latitude": 21.21234,
    "longitude": -99.45714
  },
  {
    "latitude": 21.21029,
    "longitude": -99.45484
  },
  {
    "latitude": 21.20672,
    "longitude": -99.45232
  },
  {
    "latitude": 21.20347,
    "longitude": -99.44929
  },
  {
    "latitude": 21.20045,
    "longitude": -99.44736
  },
  {
    "latitude": 21.19909,
    "longitude": -99.44514
  },
  {
    "latitude": 21.19677,
    "longitude": -99.44521
  },
  {
    "latitude": 21.19618,
    "longitude": -99.44335
  },
  {
    "latitude": 21.19493,
    "longitude": -99.44168
  },
  {
    "latitude": 21.19376,
    "longitude": -99.44148
  },
  {
    "latitude": 21.1919,
    "longitude": -99.44323
  },
  {
    "latitude": 21.18944,
    "longitude": -99.44334
  },
  {
    "latitude": 21.17898,
    "longitude": -99.44045
  },
  {
    "latitude": 21.17805,
    "longitude": -99.4395
  },
  {
    "latitude": 21.17802,
    "longitude": -99.4349
  },
  {
    "latitude": 21.17482,
    "longitude": -99.42495
  },
  {
    "latitude": 21.17556,
    "longitude": -99.41777
  },
  {
    "latitude": 21.17268,
    "longitude": -99.41067
  },
  {
    "latitude": 21.16973,
    "longitude": -99.40564
  },
  {
    "latitude": 21.16559,
    "longitude": -99.39391
  },
  {
    "latitude": 21.16554,
    "longitude": -99.39069
  },
  {
    "latitude": 21.16733,
    "longitude": -99.3882
  },
  {
    "latitude": 21.16856,
    "longitude": -99.38174
  },
  {
    "latitude": 21.16689,
    "longitude": -99.37751
  },
  {
    "latitude": 21.16583,
    "longitude": -99.37604
  },
  {
    "latitude": 21.1656,
    "longitude": -99.37301
  },
  {
    "latitude": 21.16594,
    "longitude": -99.37193
  },
  {
    "latitude": 21.16508,
    "longitude": -99.37039
  },
  {
    "latitude": 21.16487,
    "longitude": -99.36871
  },
  {
    "latitude": 21.16392,
    "longitude": -99.3674
  },
  {
    "latitude": 21.16482,
    "longitude": -99.36624
  },
  {
    "latitude": 21.16432,
    "longitude": -99.3653
  },
  {
    "latitude": 21.16452,
    "longitude": -99.3642
  },
  {
    "latitude": 21.16328,
    "longitude": -99.36292
  },
  {
    "latitude": 21.16306,
    "longitude": -99.3621
  },
  {
    "latitude": 21.16341,
    "longitude": -99.36078
  },
  {
    "latitude": 21.16444,
    "longitude": -99.35991
  },
  {
    "latitude": 21.1649,
    "longitude": -99.35885
  },
  {
    "latitude": 21.16544,
    "longitude": -99.35599
  },
  {
    "latitude": 21.16693,
    "longitude": -99.35545
  },
  {
    "latitude": 21.16722,
    "longitude": -99.35398
  },
  {
    "latitude": 21.16851,
    "longitude": -99.35368
  },
  {
    "latitude": 21.16894,
    "longitude": -99.35312
  },
  {
    "latitude": 21.16803,
    "longitude": -99.34949
  },
  {
    "latitude": 21.16909,
    "longitude": -99.3476
  },
  {
    "latitude": 21.16956,
    "longitude": -99.34134
  },
  {
    "latitude": 21.17141,
    "longitude": -99.33034
  },
  {
    "latitude": 21.17283,
    "longitude": -99.32769
  },
  {
    "latitude": 21.17529,
    "longitude": -99.32792
  },
  {
    "latitude": 21.176,
    "longitude": -99.32703
  },
  {
    "latitude": 21.17682,
    "longitude": -99.32675
  },
  {
    "latitude": 21.17657,
    "longitude": -99.32561
  },
  {
    "latitude": 21.17696,
    "longitude": -99.32462
  },
  {
    "latitude": 21.17834,
    "longitude": -99.32481
  },
  {
    "latitude": 21.17896,
    "longitude": -99.32556
  },
  {
    "latitude": 21.17943,
    "longitude": -99.32558
  },
  {
    "latitude": 21.17972,
    "longitude": -99.32435
  },
  {
    "latitude": 21.17857,
    "longitude": -99.32317
  },
  {
    "latitude": 21.17856,
    "longitude": -99.32269
  },
  {
    "latitude": 21.18017,
    "longitude": -99.32209
  },
  {
    "latitude": 21.18279,
    "longitude": -99.32019
  },
  {
    "latitude": 21.18502,
    "longitude": -99.32044
  },
  {
    "latitude": 21.18494,
    "longitude": -99.32201
  },
  {
    "latitude": 21.18652,
    "longitude": -99.32221
  },
  {
    "latitude": 21.18671,
    "longitude": -99.32133
  },
  {
    "latitude": 21.18823,
    "longitude": -99.32136
  },
  {
    "latitude": 21.18835,
    "longitude": -99.32076
  },
  {
    "latitude": 21.18386,
    "longitude": -99.32032
  },
  {
    "latitude": 21.18395,
    "longitude": -99.31933
  },
  {
    "latitude": 21.18497,
    "longitude": -99.31821
  },
  {
    "latitude": 21.19084,
    "longitude": -99.29888
  },
  {
    "latitude": 21.19645,
    "longitude": -99.29056
  },
  {
    "latitude": 21.22199,
    "longitude": -99.27937
  },
  {
    "latitude": 21.22352,
    "longitude": -99.27913
  },
  {
    "latitude": 21.22698,
    "longitude": -99.27966
  },
  {
    "latitude": 21.2296,
    "longitude": -99.27843
  },
  {
    "latitude": 21.23045,
    "longitude": -99.27753
  },
  {
    "latitude": 21.23083,
    "longitude": -99.27521
  },
  {
    "latitude": 21.23142,
    "longitude": -99.27414
  },
  {
    "latitude": 21.24056,
    "longitude": -99.26699
  },
  {
    "latitude": 21.24391,
    "longitude": -99.26207
  },
  {
    "latitude": 21.25888,
    "longitude": -99.25165
  },
  {
    "latitude": 21.26092,
    "longitude": -99.25118
  },
  {
    "latitude": 21.26455,
    "longitude": -99.25161
  },
  {
    "latitude": 21.26899,
    "longitude": -99.24948
  },
  {
    "latitude": 21.28075,
    "longitude": -99.24903
  },
  {
    "latitude": 21.2818,
    "longitude": -99.24846
  },
  {
    "latitude": 21.28307,
    "longitude": -99.24411
  },
  {
    "latitude": 21.28311,
    "longitude": -99.24164
  },
  {
    "latitude": 21.2811,
    "longitude": -99.23185
  },
  {
    "latitude": 21.28125,
    "longitude": -99.22879
  },
  {
    "latitude": 21.28024,
    "longitude": -99.22569
  },
  {
    "latitude": 21.28022,
    "longitude": -99.22416
  },
  {
    "latitude": 21.28081,
    "longitude": -99.22391
  },
  {
    "latitude": 21.28303,
    "longitude": -99.22558
  },
  {
    "latitude": 21.28467,
    "longitude": -99.225
  },
  {
    "latitude": 21.2849,
    "longitude": -99.22324
  },
  {
    "latitude": 21.2868,
    "longitude": -99.22248
  },
  {
    "latitude": 21.28732,
    "longitude": -99.2218
  },
  {
    "latitude": 21.28743,
    "longitude": -99.22057
  },
  {
    "latitude": 21.28676,
    "longitude": -99.21837
  },
  {
    "latitude": 21.28736,
    "longitude": -99.21804
  },
  {
    "latitude": 21.28885,
    "longitude": -99.21833
  },
  {
    "latitude": 21.28971,
    "longitude": -99.21795
  },
  {
    "latitude": 21.29084,
    "longitude": -99.21529
  },
  {
    "latitude": 21.29135,
    "longitude": -99.21271
  },
  {
    "latitude": 21.28914,
    "longitude": -99.21027
  },
  {
    "latitude": 21.28844,
    "longitude": -99.20891
  },
  {
    "latitude": 21.28738,
    "longitude": -99.20885
  },
  {
    "latitude": 21.28538,
    "longitude": -99.20781
  },
  {
    "latitude": 21.28303,
    "longitude": -99.20865
  },
  {
    "latitude": 21.28157,
    "longitude": -99.20985
  },
  {
    "latitude": 21.27952,
    "longitude": -99.21255
  },
  {
    "latitude": 21.27834,
    "longitude": -99.21338
  },
  {
    "latitude": 21.27608,
    "longitude": -99.21442
  },
  {
    "latitude": 21.27391,
    "longitude": -99.21442
  },
  {
    "latitude": 21.27378,
    "longitude": -99.21392
  },
  {
    "latitude": 21.27429,
    "longitude": -99.21319
  },
  {
    "latitude": 21.27555,
    "longitude": -99.2129
  },
  {
    "latitude": 21.27698,
    "longitude": -99.21145
  },
  {
    "latitude": 21.27789,
    "longitude": -99.20933
  },
  {
    "latitude": 21.27769,
    "longitude": -99.20754
  },
  {
    "latitude": 21.27552,
    "longitude": -99.20596
  },
  {
    "latitude": 21.2738,
    "longitude": -99.2063
  },
  {
    "latitude": 21.27308,
    "longitude": -99.20445
  },
  {
    "latitude": 21.27198,
    "longitude": -99.20313
  },
  {
    "latitude": 21.27085,
    "longitude": -99.20262
  },
  {
    "latitude": 21.26919,
    "longitude": -99.20278
  },
  {
    "latitude": 21.26782,
    "longitude": -99.20066
  },
  {
    "latitude": 21.26599,
    "longitude": -99.20037
  },
  {
    "latitude": 21.2657,
    "longitude": -99.19939
  },
  {
    "latitude": 21.26364,
    "longitude": -99.19716
  },
  {
    "latitude": 21.26108,
    "longitude": -99.19533
  },
  {
    "latitude": 21.25831,
    "longitude": -99.19455
  },
  {
    "latitude": 21.2571,
    "longitude": -99.19031
  },
  {
    "latitude": 21.25648,
    "longitude": -99.18939
  },
  {
    "latitude": 21.25628,
    "longitude": -99.18552
  },
  {
    "latitude": 21.25798,
    "longitude": -99.18224
  },
  {
    "latitude": 21.26336,
    "longitude": -99.17996
  },
  {
    "latitude": 21.26258,
    "longitude": -99.17266
  },
  {
    "latitude": 21.26466,
    "longitude": -99.16732
  },
  {
    "latitude": 21.27127,
    "longitude": -99.15999
  },
  {
    "latitude": 21.27326,
    "longitude": -99.15857
  },
  {
    "latitude": 21.27554,
    "longitude": -99.15544
  },
  {
    "latitude": 21.27574,
    "longitude": -99.15336
  },
  {
    "latitude": 21.27915,
    "longitude": -99.15036
  },
  {
    "latitude": 21.28113,
    "longitude": -99.14652
  },
  {
    "latitude": 21.28395,
    "longitude": -99.1438
  },
  {
    "latitude": 21.28547,
    "longitude": -99.14292
  },
  {
    "latitude": 21.28705,
    "longitude": -99.14104
  },
  {
    "latitude": 21.29059,
    "longitude": -99.13354
  },
  {
    "latitude": 21.29234,
    "longitude": -99.13191
  },
  {
    "latitude": 21.29223,
    "longitude": -99.12374
  },
  {
    "latitude": 21.29293,
    "longitude": -99.11801
  },
  {
    "latitude": 21.29119,
    "longitude": -99.11352
  },
  {
    "latitude": 21.29086,
    "longitude": -99.11067
  },
  {
    "latitude": 21.29177,
    "longitude": -99.10691
  },
  {
    "latitude": 21.29265,
    "longitude": -99.10554
  },
  {
    "latitude": 21.29356,
    "longitude": -99.10115
  },
  {
    "latitude": 21.29587,
    "longitude": -99.09719
  },
  {
    "latitude": 21.29564,
    "longitude": -99.09384
  },
  {
    "latitude": 21.29671,
    "longitude": -99.09216
  },
  {
    "latitude": 21.29735,
    "longitude": -99.08919
  },
  {
    "latitude": 21.2971,
    "longitude": -99.08559
  },
  {
    "latitude": 21.29762,
    "longitude": -99.08528
  },
  {
    "latitude": 21.29939,
    "longitude": -99.0856
  },
  {
    "latitude": 21.30183,
    "longitude": -99.08538
  },
  {
    "latitude": 21.30287,
    "longitude": -99.08614
  },
  {
    "latitude": 21.30441,
    "longitude": -99.08924
  },
  {
    "latitude": 21.30562,
    "longitude": -99.09002
  },
  {
    "latitude": 21.30777,
    "longitude": -99.08961
  },
  {
    "latitude": 21.30913,
    "longitude": -99.08863
  },
  {
    "latitude": 21.30626,
    "longitude": -99.07951
  },
  {
    "latitude": 21.30468,
    "longitude": -99.07618
  },
  {
    "latitude": 21.30622,
    "longitude": -99.07438
  },
  {
    "latitude": 21.30644,
    "longitude": -99.07309
  },
  {
    "latitude": 21.30524,
    "longitude": -99.06883
  },
  {
    "latitude": 21.3021,
    "longitude": -99.06502
  },
  {
    "latitude": 21.30284,
    "longitude": -99.06353
  },
  {
    "latitude": 21.30283,
    "longitude": -99.06245
  },
  {
    "latitude": 21.30499,
    "longitude": -99.06158
  },
  {
    "latitude": 21.30911,
    "longitude": -99.06127
  },
  {
    "latitude": 21.31087,
    "longitude": -99.06067
  },
  {
    "latitude": 21.31179,
    "longitude": -99.06091
  },
  {
    "latitude": 21.31312,
    "longitude": -99.06033
  },
  {
    "latitude": 21.3144,
    "longitude": -99.05955
  },
  {
    "latitude": 21.31467,
    "longitude": -99.05887
  },
  {
    "latitude": 21.31621,
    "longitude": -99.05755
  },
  {
    "latitude": 21.31764,
    "longitude": -99.057
  },
  {
    "latitude": 21.32163,
    "longitude": -99.05134
  },
  {
    "latitude": 21.32219,
    "longitude": -99.05105
  },
  {
    "latitude": 21.32821,
    "longitude": -99.04931
  },
  {
    "latitude": 21.33001,
    "longitude": -99.05017
  },
  {
    "latitude": 21.33213,
    "longitude": -99.04969
  },
  {
    "latitude": 21.33369,
    "longitude": -99.05007
  },
  {
    "latitude": 21.33754,
    "longitude": -99.04773
  },
  {
    "latitude": 21.33887,
    "longitude": -99.04856
  },
  {
    "latitude": 21.33885,
    "longitude": -99.04496
  },
  {
    "latitude": 21.33969,
    "longitude": -99.04423
  },
  {
    "latitude": 21.34061,
    "longitude": -99.04441
  },
  {
    "latitude": 21.34147,
    "longitude": -99.04399
  },
  {
    "latitude": 21.34231,
    "longitude": -99.04539
  },
  {
    "latitude": 21.34598,
    "longitude": -99.0461
  },
  {
    "latitude": 21.34746,
    "longitude": -99.04534
  },
  {
    "latitude": 21.34993,
    "longitude": -99.04559
  },
  {
    "latitude": 21.3527,
    "longitude": -99.04771
  },
  {
    "latitude": 21.35413,
    "longitude": -99.04777
  },
  {
    "latitude": 21.35508,
    "longitude": -99.0497
  },
  {
    "latitude": 21.35732,
    "longitude": -99.05108
  },
  {
    "latitude": 21.35816,
    "longitude": -99.05116
  },
  {
    "latitude": 21.35955,
    "longitude": -99.04896
  },
  {
    "latitude": 21.35973,
    "longitude": -99.04669
  },
  {
    "latitude": 21.36061,
    "longitude": -99.04524
  },
  {
    "latitude": 21.36136,
    "longitude": -99.04157
  },
  {
    "latitude": 21.36057,
    "longitude": -99.03749
  },
  {
    "latitude": 21.36099,
    "longitude": -99.03546
  },
  {
    "latitude": 21.3596,
    "longitude": -99.03296
  },
  {
    "latitude": 21.36001,
    "longitude": -99.03129
  },
  {
    "latitude": 21.35976,
    "longitude": -99.02814
  },
  {
    "latitude": 21.35895,
    "longitude": -99.02745
  },
  {
    "latitude": 21.35992,
    "longitude": -99.02641
  },
  {
    "latitude": 21.35976,
    "longitude": -99.02418
  },
  {
    "latitude": 21.36171,
    "longitude": -99.02297
  },
  {
    "latitude": 21.36097,
    "longitude": -99.02184
  },
  {
    "latitude": 21.36227,
    "longitude": -99.02169
  },
  {
    "latitude": 21.36223,
    "longitude": -99.02081
  },
  {
    "latitude": 21.36326,
    "longitude": -99.02033
  },
  {
    "latitude": 21.36318,
    "longitude": -99.01912
  },
  {
    "latitude": 21.36416,
    "longitude": -99.01929
  },
  {
    "latitude": 21.36517,
    "longitude": -99.01835
  },
  {
    "latitude": 21.36496,
    "longitude": -99.01678
  },
  {
    "latitude": 21.36851,
    "longitude": -99.01582
  },
  {
    "latitude": 21.37015,
    "longitude": -99.01416
  },
  {
    "latitude": 21.3712,
    "longitude": -99.01367
  },
  {
    "latitude": 21.37094,
    "longitude": -99.01244
  },
  {
    "latitude": 21.37123,
    "longitude": -99.01155
  },
  {
    "latitude": 21.37238,
    "longitude": -99.01134
  },
  {
    "latitude": 21.37251,
    "longitude": -99.00979
  },
  {
    "latitude": 21.37316,
    "longitude": -99.00913
  },
  {
    "latitude": 21.37285,
    "longitude": -99.00814
  },
  {
    "latitude": 21.3731,
    "longitude": -99.00722
  },
  {
    "latitude": 21.3727,
    "longitude": -99.00644
  },
  {
    "latitude": 21.37347,
    "longitude": -99.0054
  },
  {
    "latitude": 21.37333,
    "longitude": -99.00446
  },
  {
    "latitude": 21.37515,
    "longitude": -99.00414
  },
  {
    "latitude": 21.37636,
    "longitude": -99.00471
  },
  {
    "latitude": 21.37706,
    "longitude": -99.00402
  },
  {
    "latitude": 21.37872,
    "longitude": -99.00449
  },
  {
    "latitude": 21.37938,
    "longitude": -99.00393
  },
  {
    "latitude": 21.37904,
    "longitude": -99.00148
  },
  {
    "latitude": 21.37953,
    "longitude": -99.0001
  },
  {
    "latitude": 21.37852,
    "longitude": -98.99581
  },
  {
    "latitude": 21.38046,
    "longitude": -98.99344
  },
  {
    "latitude": 21.38138,
    "longitude": -98.99143
  },
  {
    "latitude": 21.38245,
    "longitude": -98.99077
  },
  {
    "latitude": 21.38334,
    "longitude": -98.99146
  },
  {
    "latitude": 21.38402,
    "longitude": -98.99284
  },
  {
    "latitude": 21.38461,
    "longitude": -98.99292
  },
  {
    "latitude": 21.38548,
    "longitude": -98.99198
  },
  {
    "latitude": 21.38504,
    "longitude": -98.99114
  },
  {
    "latitude": 21.38492,
    "longitude": -98.9889
  },
  {
    "latitude": 21.38535,
    "longitude": -98.9884
  },
  {
    "latitude": 21.38543,
    "longitude": -98.98919
  }
];
