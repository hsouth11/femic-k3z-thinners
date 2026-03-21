Getting Started
===============

Purpose
-------

``femic-k3z-instance`` is a runnable, versioned K3Z deployment instance for
teaching and collaboration.

This repository now carries multiple coexisting Patchworks variants inside one
instance checkout.

Current variants:

- baseline teaching variant
  - variant spec: ``config/patchworks.variant.baseline.yaml``
  - runtime config: ``config/patchworks.runtime.windows.yaml``
  - Patchworks PIN: ``models/k3z_patchworks_model/analysis/base.pin``
- optional CT/QMD/fert variant
  - variant spec: ``config/patchworks.variant.ctfert.yaml``
  - runtime config: ``config/patchworks.runtime.ctfert.windows.yaml``
  - Patchworks PIN: ``models/k3z_patchworks_model/analysis/ctfert.pin``
- optional PCT->CT variant
  - variant spec: ``config/patchworks.variant.pctct.yaml``
  - runtime config: ``config/patchworks.runtime.pctct.windows.yaml``
  - Patchworks PIN: ``models/k3z_patchworks_model/analysis/pctct.pin``

Students should choose a variant by config/PIN, not by switching git branches.

The intended launch pairings are:

- baseline: ``config/patchworks.runtime.windows.yaml`` + ``analysis/base.pin``
- CT/fert variant: ``config/patchworks.runtime.ctfert.windows.yaml`` + ``analysis/ctfert.pin``
- PCT->CT variant: ``config/patchworks.runtime.pctct.windows.yaml`` + ``analysis/pctct.pin``

Prerequisites
-------------

- Python environment with ``femic`` installed.
- Patchworks runtime installed and licensed on the host machine.
- Local checkout with required submodules initialized.

Quickstart
----------

1. Validate case prerequisites:

   .. code-block:: bash

      femic prep validate-case --run-config config/run_profile.k3z.yaml --tipsy-config-dir config/tipsy

2. Compile/rebuild upstream inputs:

   .. code-block:: bash

      femic run --run-config config/run_profile.k3z.yaml --run-id k3z_stage01a

3. Run BatchTIPSY manually on Windows using the freshly generated:

   - `data/02_input-tsak3z.dat`
   - `data/tipsy_params_tsak3z.xlsx` (or the current timestamped fallback workbook if Excel had the canonical workbook locked)

4. Resume downstream from the fresh BatchTIPSY output:

   .. code-block:: bash

      femic tsa post-tipsy --run-config config/run_profile.k3z.yaml --tsa k3z --run-id k3z_stage01a

3. Run the baseline Patchworks matrix build:

   .. code-block:: bash

      femic patchworks matrix-build --config config/patchworks.runtime.windows.yaml --run-id k3z_baseline

4. Run the optional CT/fert Patchworks matrix build:

   .. code-block:: bash

      femic patchworks matrix-build --config config/patchworks.runtime.ctfert.windows.yaml --run-id k3z_ctfert

5. Run the optional PCT->CT Patchworks matrix build:

   .. code-block:: bash

      femic patchworks matrix-build --config config/patchworks.runtime.pctct.windows.yaml --run-id k3z_pctct

Variant-Specific Operator Inputs
--------------------------------

Baseline teaching variant:

- ``config/patchworks.variant.baseline.yaml``

Optional CT/fert variant:

- ``config/patchworks.variant.ctfert.yaml``
- ``config/silviculture.k3z.ctfert.yaml``

The CT/fert variant YAML controls:

- CT eligibility AUs,
- CT age and removal assumptions,
- provisional BA:volume conversion,
- fertilization response window and speedup fraction,
- ``F1`` / ``F2`` / ``F3`` timing rules.

Optional PCT->CT variant:

- ``config/patchworks.variant.pctct.yaml``
- ``config/silviculture.k3z.pctct.yaml``

The PCT->CT variant YAML controls:

- PCT eligibility AUs,
- PCT default age (currently 10),
- post-PCT removal of HW ingress from the planted path,
- CT eligibility only after the PCT gate,
- CT age and removal assumptions without any fertilization chain.

Authoritative Paths
-------------------

- Patchworks model root:
  ``models/k3z_patchworks_model/``
- Baseline tracks:
  ``models/k3z_patchworks_model/tracks/``
- CT/fert tracks:
  ``models/k3z_patchworks_model/tracks_ctfert/``
- PCT->CT tracks:
  ``models/k3z_patchworks_model/tracks_pctct/``
- Runtime logs/manifests:
  ``vdyp_io/logs/``

Baseline K3Z Policy Notes
-------------------------

- Managed curves now come from real BatchTIPSY output.
- `CWHvm_CW+YC` and `CWHvm_CW+PLC` are intentionally excluded from the
  treated/TIPSY path and retained out of THLB with `RETENTION = 1.0`.
- Remaining treated AUs use the simplified teaching planting rules documented
  in `config/tipsy/tsak3z.yaml`.
