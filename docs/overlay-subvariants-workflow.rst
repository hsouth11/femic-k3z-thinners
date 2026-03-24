Overlay Subvariants Workflow
============================

Purpose
-------

This page turns the K3Z overlay work into one repeatable student/operator
workflow.

Use it when the teaching question is about alternative retained-area policy on
top of the accepted K3Z baseline, not when the question is about changing
silviculture logic or rebuilding the whole baseline model.

What the Overlay Subvariants Are
--------------------------------

The four overlay subvariants are baseline-derived K3Z surfaces.

They are intended to hold everything constant except fragment-level
``RETENTION``.

The available overlay subvariants are:

- ``basecase_riparian``
- ``basecase_sum``
- ``scenario1_sum``
- ``scenario2_sum``

Each one uses a different retained-area column from the student source table.

Current Source Contract
-----------------------

Current teaching handoff:

- source workbook export name: ``Fragments_Retention_HSmith.xls``
- key field in the workbook: ``FEATURE_ID1``
- canonical K3Z join key: ``FEATURE_ID``
- current imported retention columns:
  - ``Basecase_Riparian``
  - ``BaseCase_Sum``
  - ``Scenario1_Sum``
  - ``Scenario2_Sum``

Current join bridge:

1. student workbook row keyed by ``FEATURE_ID1``
2. join to ``models/k3z_patchworks_model/blocks/blocks.shp`` on ``FEATURE_ID``
3. bridge through shared ``BLOCK``
4. reach the canonical baseline fragments surface
5. rebuild one overlay fragments surface per chosen retention column

Current checked workflow evidence:

- workbook rows: ``218``
- blocks rows matched: ``218``
- baseline fragments rows matched: ``218``
- null retained-area values after normalization: ``0`` across all four columns

Subvariant Meaning Map
----------------------

.. list-table::
   :header-rows: 1

   * - Subvariant
     - Workbook field
     - Teaching meaning
     - Launch pairing
   * - ``basecase_riparian``
     - ``Basecase_Riparian``
     - riparian-style retained-area comparison on top of baseline
     - ``config/patchworks.runtime.overlay.basecase_riparian.windows.yaml`` + ``analysis/overlay_basecase_riparian.pin``
   * - ``basecase_sum``
     - ``BaseCase_Sum``
     - summed base-case retained area from the student overlay
     - ``config/patchworks.runtime.overlay.basecase_sum.windows.yaml`` + ``analysis/overlay_basecase_sum.pin``
   * - ``scenario1_sum``
     - ``Scenario1_Sum``
     - first alternative student retained-area scenario
     - ``config/patchworks.runtime.overlay.scenario1_sum.windows.yaml`` + ``analysis/overlay_scenario1_sum.pin``
   * - ``scenario2_sum``
     - ``Scenario2_Sum``
     - second alternative student retained-area scenario
     - ``config/patchworks.runtime.overlay.scenario2_sum.windows.yaml`` + ``analysis/overlay_scenario2_sum.pin``

What Must Stay Fixed
--------------------

When using the overlay subvariants, treat the accepted baseline as the parent
surface.

The overlay workflow is intended to keep fixed:

- the accepted baseline geometry set
- baseline non-overlay modeling assumptions
- baseline yield source
- baseline treatment logic
- baseline PIN logic except for overlay-specific wrapper wiring

The intended change is only:

- fragment ``RETENTION``
- resulting managed-vs-unmanaged area balance
- any downstream managed-species account dropout that happens because retained
  area removes that species from the managed side

Repeatable Student Workflow
---------------------------

1. Sync your fork or local clone to current upstream ``main`` before using the
   overlay subvariants.
2. Read :doc:`variants-and-subvariants` first so you know whether you need
   baseline, an intensive-silviculture variant, or an overlay subvariant.
3. Use the overlay subvariants only when the assignment is specifically about
   retained-area sensitivity on top of baseline.
4. Keep the selected overlay runtime config and overlay PIN paired exactly.
5. Compare results against ``base`` first, not against another overlay
   subvariant.
6. Keep the selected workbook field explicit in screenshots, notes, and report
   captions.

Repeatable Launch Workflow
--------------------------

Build and launch one overlay subvariant at a time.

Example command pattern:

.. code-block:: bash

   femic patchworks matrix-build --config config/patchworks.runtime.overlay.basecase_riparian.windows.yaml --run-id k3z_overlay_basecase_riparian

Current launch pairings:

- ``basecase_riparian``:
  ``config/patchworks.runtime.overlay.basecase_riparian.windows.yaml`` +
  ``models/k3z_patchworks_model/analysis/overlay_basecase_riparian.pin``
- ``basecase_sum``:
  ``config/patchworks.runtime.overlay.basecase_sum.windows.yaml`` +
  ``models/k3z_patchworks_model/analysis/overlay_basecase_sum.pin``
- ``scenario1_sum``:
  ``config/patchworks.runtime.overlay.scenario1_sum.windows.yaml`` +
  ``models/k3z_patchworks_model/analysis/overlay_scenario1_sum.pin``
- ``scenario2_sum``:
  ``config/patchworks.runtime.overlay.scenario2_sum.windows.yaml`` +
  ``models/k3z_patchworks_model/analysis/overlay_scenario2_sum.pin``

Current Validation Snapshot
---------------------------

Current retained-area totals relative to the accepted baseline are:

- baseline retained area: ``89.065662 ha``
- ``basecase_riparian`` retained area: ``164.305456 ha`` (``+75.239794 ha``)
- ``basecase_sum`` retained area: ``379.898530 ha`` (``+290.832868 ha``)
- ``scenario1_sum`` retained area: ``546.841710 ha`` (``+457.776048 ha``)
- ``scenario2_sum`` retained area: ``622.819837 ha`` (``+533.754175 ha``)

Use those values as a sanity-check pattern for the current checked overlay
surfaces, not as a universal rule for future workbook edits.

Audit Checklist
---------------

- Confirm the source table still resolves 1:1 through the ``FEATURE_ID1`` ->
  ``FEATURE_ID`` -> ``BLOCK`` bridge.
- Confirm null retained-area values remain absent for the chosen workbook
  column.
- Confirm only fragment ``RETENTION`` differs from baseline.
- Confirm managed/unmanaged area shifts are explainable from the chosen
  retained-area column.
- Confirm unexpected treatment-path changes do not appear.
- Treat missing managed species accounts as acceptable only when retained area
  explains why that species disappeared from the managed side.

Where to Look Next
------------------

- Launch matrix and variant selection: :doc:`variants-and-subvariants`
- Step-by-step operator command patterns: :doc:`operator-runbook`
- Overlay QA expectations: :doc:`rebuild-and-qa`
- Scenario comparison guidance: :doc:`edit-policy-and-scenarios`
