Model Anatomy
=============

Directory Map
-------------

- ``analysis/``: Patchworks PIN files and runtime entrypoints.
- ``blocks/``: block shapefile and topology CSV used by Patchworks joins.
- ``config/``: run profile, seral config, TIPSY rules, Patchworks runtime config.
- ``data/``: local case inputs, cached intermediates, model-input bundle tables.
- ``models/k3z_patchworks_model/``: curated Patchworks model package.
- ``output/``: validated export products from FEMIC stages.
- ``plots/``: QA and interpretation figures for strata/curves/overlays.
- ``vdyp_io/logs/``: reproducibility artifacts (manifests, matrix logs, reports).

Generated vs Editable
---------------------

Safe to edit directly:

- ``config/run_profile.k3z.yaml``
- ``config/seral.k3z.yaml``
- ``config/tipsy/tsak3z.yaml``
- fragment-level ``RETENTION`` values when/if you intentionally edit retained-area policy in the validated fragments dataset

Regenerate instead of hand-edit:

- ``data/model_input_bundle/*.csv``
- ``models/k3z_patchworks_model/tracks/*.csv``
- ``models/k3z_patchworks_model/yield/forestmodel.xml``
- ``output/patchworks_k3z_validated/fragments/*``

Seral account surfaces:

- Global compatibility surface: ``feature.Seral.<stage>``
- AU-specific inventory-state surface: ``feature.Seral.<au_id>.<stage>``
- Treatment consequence surface: ``product.Seral.area.<stage>.<au_id>.CC``

Use caution:

- ``models/k3z_patchworks_model/analysis/base.pin`` (runtime wiring)
- ``models/k3z_patchworks_model/blocks/*`` (must stay join-consistent with tracks)


Retention surface
-----------------

K3Z now carries a fragment-level ``RETENTION`` field in the validated Patchworks
fragments dataset.

- ``0.0`` means no retained area is withdrawn from the managed landbase.
- ``1.0`` means the full fragment area is retained.
- intermediate values mean partial retained area.

Current K3Z baseline:

- all fragments are initialized to ``RETENTION = 0.0``
- this keeps managed/unmanaged behavior identical to the pre-retention K3Z build
  while preserving the retention wiring for future policy experiments.

Do not hand-edit retention in multiple places. If you change retention policy,
update the validated fragments dataset and rerun Matrix Builder so the retained
share flows into Patchworks unmanaged area consistently.
