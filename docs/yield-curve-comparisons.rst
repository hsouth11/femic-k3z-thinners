.. _k3z-yield-curve-comparisons:

Yield Curve Comparisons
=======================

Purpose
-------

This page surfaces the current K3Z treated-yield comparison figures in a place
students can reach directly from the main guide flow.

These figures compare the managed treated curve reconstructed directly from the
current checked-in BatchTIPSY output file
``data/04_output-tsak3z.csv`` against the corresponding VDYP reference curve
for each treated AU shown here.

Use this page when you want to answer questions such as:

- which treated AUs currently have comparison plots;
- how the managed TIPSY curve differs in shape or timing from the VDYP
  reference curve;
- whether the current treated-curve story looks plausible enough for teaching
  and interpretation.

How To Read These Figures
-------------------------

- Treat each figure as a one-AU comparison between the raw BatchTIPSY managed
  curve and the corresponding VDYP reference curve.
- Focus first on broad shape: early growth, peak timing, and whether the two
  curves stay close or diverge strongly at older ages.
- Use the figures as interpretation aids, not as a substitute for the
  underlying exported curves, tracks, or account surfaces.
- In these figures, VDYP is shown as the comparison/QA reference rather than as
  the managed treated curve source.
- For the full catalog of K3Z figures and source filenames, use
  :ref:`k3z-figure-appendix`.

Current Coverage
----------------

The current treated comparison set on this page is rendered directly from the
currently checked-in raw BatchTIPSY output file, so it reflects the treated AUs
present in that artifact.

Current TIPSY-vs-VDYP Gallery
-----------------------------

.. figure:: ../plots/tipsy_vdyp_tsak3z-21000.png
   :alt: tipsy_vdyp_tsak3z-21000.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``21000``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-21001.png
   :alt: tipsy_vdyp_tsak3z-21001.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``21001``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-21003.png
   :alt: tipsy_vdyp_tsak3z-21003.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``21003``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-22001.png
   :alt: tipsy_vdyp_tsak3z-22001.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``22001``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-22002.png
   :alt: tipsy_vdyp_tsak3z-22002.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``22002``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-22003.png
   :alt: tipsy_vdyp_tsak3z-22003.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``22003``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-22004.png
   :alt: tipsy_vdyp_tsak3z-22004.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``22004``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-22005.png
   :alt: tipsy_vdyp_tsak3z-22005.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``22005``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-22006.png
   :alt: tipsy_vdyp_tsak3z-22006.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``22006``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-22007.png
   :alt: tipsy_vdyp_tsak3z-22007.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``22007``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-22008.png
   :alt: tipsy_vdyp_tsak3z-22008.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``22008``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-23000.png
   :alt: tipsy_vdyp_tsak3z-23000.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``23000``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-23001.png
   :alt: tipsy_vdyp_tsak3z-23001.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``23001``.

.. figure:: ../plots/tipsy_vdyp_tsak3z-23003.png
   :alt: tipsy_vdyp_tsak3z-23003.png
   :width: 90%

   Raw BatchTIPSY-vs-VDYP treated yield-curve comparison for AU ``23003``.

Where These Figures Come From
-----------------------------

- Plot files live under ``plots/`` in this instance checkout.
- The current overlays on this page were regenerated from
  ``data/04_output-tsak3z.csv`` plus ``data/vdyp_curves_smooth-tsak3z.feather``.
- The current rendered source filenames are retained in
  :ref:`k3z-figure-appendix`.
- Rebuild and QA guidance for regenerating or checking these figures lives in
  :doc:`rebuild-and-qa` and :doc:`operator-runbook`.
