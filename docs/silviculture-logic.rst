Silviculture Logic
==================

Purpose
-------

This page documents the actual treatment parameters, gating fields, and
sequencing logic for the two intensive-silviculture K3Z variants.

Control Fields
--------------

- ``ORIGIN`` distinguishes natural vs planted composition.
- ``IFM`` distinguishes managed vs unmanaged land-base behavior.
- ``SILV_STATE`` carries treatment history for the intensive variants.

In both intensive variants, treatment history is carried by ``SILV_STATE``,
not by overloading ``ORIGIN``.

Gate Summary
------------

- ``ORIGIN`` gates entry into both intensive paths: only planted-origin stands
  are eligible.
- ``SILV_STATE`` records where a stand currently sits in the treatment chain
  and therefore gates the next treatment in sequence.
- ``IFM`` still separates managed vs unmanaged land-base behavior; unmanaged
  tracks do not enter the intensive treatment chains.

CT/Fert Variant
---------------

Canonical control files:

- ``config/patchworks.variant.ctfert.yaml``
- ``config/silviculture.k3z.ctfert.yaml``

Treatment parameter table:

.. list-table::
   :header-rows: 1

   * - Element
     - Current implementation
   * - Eligible AUs
     - ``985502001`` and ``985502002``
   * - Eligibility gate
     - planted-only path (``min_origin: planted``)
   * - State transition field
     - ``SILV_STATE``
   * - CT transition
     - ``cc_pl -> cc_pl_ct``
   * - CT age
     - age ``40`` for both eligible AUs
   * - CT removal
     - ``basal_area_removal_fraction = 0.30``
   * - BA:volume conversion
     - ``basal_area_to_volume_ratio = 1.0``
   * - F1 transition
     - ``cc_pl_ct -> cc_pl_ct_f1`` at ``cai_argmax``
   * - F2 transition
     - ``cc_pl_ct_f1 -> cc_pl_ct_f1_f2`` after ``10`` years
   * - F3 transition
     - ``cc_pl_ct_f1_f2 -> cc_pl_ct_f1_f2_f3`` after ``10`` years
   * - Fert response window
     - ``response_years = 10``
   * - Fert growth speedup
     - ``growth_speedup_fraction = 0.10``
   * - QMD source
     - synthetic placeholder

Sequencing logic:

1. ``CC`` establishes the planted path.
2. ``CT`` is available only on the planted eligible AUs at the configured age.
3. ``F1`` is available only after ``CT`` and fires at ``cai_argmax``.
4. ``F2`` is available only after ``F1`` and waits ``10`` years.
5. ``F3`` is available only after ``F2`` and waits ``10`` years.

Retention and low-yield policy in this variant:

- default retained fraction is ``0.05``;
- ``CWHvm_CW+YC`` and ``CWHvm_CW+PLC`` remain full-retention strata;
- those low-yield strata stay out of the treated/TIPSY path even on the
  intensive variant.

PCT->CT Variant
---------------

Canonical control files:

- ``config/patchworks.variant.pctct.yaml``
- ``config/silviculture.k3z.pctct.yaml``

Treatment parameter table:

.. list-table::
   :header-rows: 1

   * - Element
     - Current implementation
   * - Eligible AUs
     - ``985502000``, ``985503000``, ``985502001``, and ``985503001``
   * - Eligibility gate
     - planted-only path (``min_origin: planted``)
   * - State transition field
     - ``SILV_STATE``
   * - PCT transition
     - ``cc_pl -> cc_pl_pct_light`` / ``cc_pl_pct_moderate`` / ``cc_pl_pct_heavy``
   * - PCT age
     - age ``10`` for all eligible AUs
   * - Planted regen mix
     - ``900 CW + 3100 HW`` for all eligible AUs
   * - PCT options
     - ``PCT_LIGHT`` removes ``1000`` HW stems/ha, ``PCT_MODERATE`` removes ``2000``, and ``PCT_HEAVY`` removes ``3000``
   * - Post-PCT managed mixes
     - ``900 CW + 2100 HW``, ``900 CW + 1100 HW``, and ``900 CW + 100 HW``
   * - CT transition
     - ``cc_pl_pct_* -> cc_pl_pct_*_ct``
   * - CT age
     - age ``40`` for all eligible AUs
   * - CT removal
     - ``basal_area_removal_fraction = 0.30``
   * - BA:volume conversion
     - ``basal_area_to_volume_ratio = 1.0``
   * - Fertilization
     - disabled
   * - QMD source
     - synthetic placeholder

Sequencing logic:

1. ``CC`` establishes the planted path.
2. Three age-10 PCT options are available on the planted eligible AUs:
   ``PCT_LIGHT``, ``PCT_MODERATE``, and ``PCT_HEAVY``.
3. Each ``PCT_*`` option removes a different amount of ``HW`` (Western
   Hemlock) from the planted path and leaves its own residual managed
   composition.
4. ``CT`` is available only after one of the ``PCT_*`` gates is satisfied.
5. No ``F1`` / ``F2`` / ``F3`` chain is compiled in this variant.

State Machines
--------------

``ctfert`` states:

- ``baseline``
- ``cc_pl``
- ``cc_pl_ct``
- ``cc_pl_ct_f1``
- ``cc_pl_ct_f1_f2``
- ``cc_pl_ct_f1_f2_f3``

``pctct`` states:

- ``baseline``
- ``cc_pl``
- ``cc_pl_pct_light``
- ``cc_pl_pct_light_ct``
- ``cc_pl_pct_moderate``
- ``cc_pl_pct_moderate_ct``
- ``cc_pl_pct_heavy``
- ``cc_pl_pct_heavy_ct``

Interpretation Notes
--------------------

- Use ``ctfert`` when the teaching question is about compounded treatment
  sequencing and fertilization response.
- Use ``pctct`` when the teaching question is about gating CT behind an earlier
  stand-tending treatment.
- Do not interpret these surfaces as polished operational prescriptions; they
  are explicit teaching scaffolds built from YAML-facing assumptions.
