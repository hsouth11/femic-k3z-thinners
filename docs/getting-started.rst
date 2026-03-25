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
  - no separate variant spec file; baseline is the default runtime surface
  - runtime config: ``config/patchworks.runtime.windows.yaml``
  - Patchworks PIN: ``models/k3z_patchworks_model/analysis/base.pin``
- optional CT/QMD/fert variant
  - variant spec: ``config/patchworks.variant.ctfert.yaml``
  - runtime config: ``config/patchworks.runtime.ctfert.windows.yaml``
  - Patchworks PIN: ``models/k3z_patchworks_model/analysis/ctfert.pin``
- optional PCT-only light subvariant:
  ``config/patchworks.variant.pct_light.yaml`` +
  ``config/patchworks.runtime.pct_light.windows.yaml`` +
  ``models/k3z_patchworks_model/analysis/pct_light.pin``
- optional PCT-only moderate subvariant:
  ``config/patchworks.variant.pct_moderate.yaml`` +
  ``config/patchworks.runtime.pct_moderate.windows.yaml`` +
  ``models/k3z_patchworks_model/analysis/pct_moderate.pin``
- optional PCT-only heavy subvariant:
  ``config/patchworks.variant.pct_heavy.yaml`` +
  ``config/patchworks.runtime.pct_heavy.windows.yaml`` +
  ``models/k3z_patchworks_model/analysis/pct_heavy.pin``

Baseline-derived overlay subvariants:

- ``basecase_riparian``
- ``basecase_sum``
- ``scenario1_sum``
- ``scenario2_sum``

For the repeatable overlay workflow, use :doc:`overlay-subvariants-workflow`.

Students should choose a variant by config/PIN, not by switching git branches.

The intended launch pairings are:

- baseline: ``config/patchworks.runtime.windows.yaml`` + ``analysis/base.pin``
- CT/fert variant: ``config/patchworks.runtime.ctfert.windows.yaml`` + ``analysis/ctfert.pin``
- PCT-only light subvariant: ``config/patchworks.runtime.pct_light.windows.yaml`` + ``analysis/pct_light.pin``
- PCT-only moderate subvariant: ``config/patchworks.runtime.pct_moderate.windows.yaml`` + ``analysis/pct_moderate.pin``
- PCT-only heavy subvariant: ``config/patchworks.runtime.pct_heavy.windows.yaml`` + ``analysis/pct_heavy.pin``

For the full launch matrix, use :doc:`variants-and-subvariants`.

For the student-facing treated yield-curve comparison figures, use
:doc:`yield-curve-comparisons`.

Quick Surface Picker
--------------------

.. list-table::
   :header-rows: 1

   * - Use case
     - Recommended surface
   * - Default teaching runs, baseline comparisons, and old-growth review
     - ``base``
   * - CT plus fertilization teaching exercise
     - ``ctfert``
   * - PCT-only teaching exercise
     - ``pct_light``, ``pct_moderate``, or ``pct_heavy``
   * - Retained-area sensitivity exercise driven by the student workbook
     - one of the four baseline overlay subvariants

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

5. Run the baseline Patchworks matrix build:

   .. code-block:: bash

      femic patchworks matrix-build --config config/patchworks.runtime.windows.yaml --run-id k3z_baseline

6. Run the optional CT/fert Patchworks matrix build:

   .. code-block:: bash

      femic patchworks matrix-build --config config/patchworks.runtime.ctfert.windows.yaml --run-id k3z_ctfert

7. Run one of the optional PCT-only subvariant matrix builds:

   .. code-block:: bash

      femic patchworks matrix-build --config config/patchworks.runtime.pct_light.windows.yaml --run-id k3z_pct_light
      femic patchworks matrix-build --config config/patchworks.runtime.pct_moderate.windows.yaml --run-id k3z_pct_moderate
      femic patchworks matrix-build --config config/patchworks.runtime.pct_heavy.windows.yaml --run-id k3z_pct_heavy

Variant-Specific Operator Inputs
--------------------------------

Baseline teaching variant:

- ``config/patchworks.runtime.windows.yaml``
- ``models/k3z_patchworks_model/analysis/base.pin``
- deep reference: :doc:`variants-and-subvariants`

Optional CT/fert variant:

- ``config/patchworks.variant.ctfert.yaml``
- ``config/silviculture.k3z.ctfert.yaml``

The CT/fert variant YAML controls:

- CT eligibility AUs,
- CT age and removal assumptions,
- provisional BA:volume conversion,
- fertilization response window and speedup fraction,
- ``F1`` / ``F2`` / ``F3`` timing rules.
- deep reference: :doc:`silviculture-logic`

Optional PCT-only subvariants:

- ``config/patchworks.variant.pct_light.yaml`` +
  ``config/silviculture.k3z.pct_light.yaml``
- ``config/patchworks.variant.pct_moderate.yaml`` +
  ``config/silviculture.k3z.pct_moderate.yaml``
- ``config/patchworks.variant.pct_heavy.yaml`` +
  ``config/silviculture.k3z.pct_heavy.yaml``

The three PCT-only subvariant YAMLs share the same:

- issue-14 eligible AU cohort: medium/high SI ``HW+FDC`` and ``FDC+HW``
  AUs ``985502000``, ``985503000``, ``985502001``, and ``985503001``,
- planted regen mix: ``900 CW + 3100 HW``,
- PCT timing: age ``10``,
- treatment-state chain: ``cc_pl -> cc_pl_pct``.

The subvariant-specific PCT flavors are:

- ``pct_light``: remove ``1000`` HW stems/ha, leaving ``900 CW + 2100 HW``
- ``pct_moderate``: remove ``2000`` HW stems/ha, leaving
  ``900 CW + 1100 HW``
- ``pct_heavy``: remove ``3000`` HW stems/ha, leaving ``900 CW + 100 HW``
- deep reference: :doc:`silviculture-logic`

Baseline overlay subvariants:

- ``config/patchworks.runtime.overlay.basecase_riparian.windows.yaml``
- ``config/patchworks.runtime.overlay.basecase_sum.windows.yaml``
- ``config/patchworks.runtime.overlay.scenario1_sum.windows.yaml``
- ``config/patchworks.runtime.overlay.scenario2_sum.windows.yaml``
- deep references:
  - :doc:`variants-and-subvariants`
  - :doc:`overlay-subvariants-workflow`

Authoritative Paths
-------------------

- Patchworks model root:
  ``models/k3z_patchworks_model/``
- Baseline tracks:
  ``models/k3z_patchworks_model/tracks/``
- CT/fert tracks:
  ``models/k3z_patchworks_model/tracks_ctfert/``
- PCT-only light tracks:
  ``models/k3z_patchworks_model/tracks_pct_light/``
- PCT-only moderate tracks:
  ``models/k3z_patchworks_model/tracks_pct_moderate/``
- PCT-only heavy tracks:
  ``models/k3z_patchworks_model/tracks_pct_heavy/``
- Runtime logs/manifests:
  ``vdyp_io/logs/``

Baseline K3Z Policy Notes
-------------------------

- Managed curves now come from real BatchTIPSY output.
- The student-facing treated TIPSY-vs-VDYP comparison figures live in
  :doc:`yield-curve-comparisons`, with the full plot catalog retained in
  :ref:`k3z-figure-appendix`.
- `CWHvm_CW+YC` and `CWHvm_CW+PLC` are intentionally excluded from the
  treated/TIPSY path and retained out of THLB with `RETENTION = 1.0`.
- Remaining treated AUs use the simplified teaching planting rules documented
  in `config/tipsy/tsak3z.yaml`.
- The accepted K3Z-specific VDYP smoothing exceptions for ``CWHvm_DR+HW`` now
  live in ``config/vdyp_fit_policy.yaml`` beside the instance rather than in
  parent FEMIC source code.
- ``og1`` / ``og2`` semantics are documented in :doc:`old-growth-attributes`.
