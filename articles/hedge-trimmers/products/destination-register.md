# Hedge-trimmer Amazon destination register

**Market:** Amazon.com, United States  
**Last synchronized:** July 14, 2026  
**Authority:** The individual product files in this folder remain the source of truth.

| Exact product/package | ASIN | Affiliate key | Publisher-confirmed link | Used in |
|---|---|---|---|---|
| EGO HT2601, 26-inch kit with 2.5 Ah battery and charger | `B0BRXK7NT2` | `ego-ht2601` | https://amzn.to/4ha9O8K | Main, cordless |
| DEWALT DCHT821B, 22-inch bare tool | `B0DVHTSWX6` | `dewalt-dcht821b` | https://amzn.to/3QRSoTV | Main |
| BLACK+DECKER BEHT350FF, 22-inch corded tool | `B07CBYR1DN` | `black-decker-beht350ff` | https://amzn.to/4wHuTw2 | Main, corded |
| WORX WG261, 22-inch kit with 2.0 Ah battery and charger | `B07MVLYF7L` | `worx-wg261` | https://amzn.to/3RAd1UP | Main, cordless |
| DEWALT DCPH820M1, pole-trimmer kit with 4.0 Ah battery and charger | `B084CZXM9V` | `dewalt-dcph820m1` | https://amzn.to/3RDs8Nf | Main |
| BLACK+DECKER BEHTS300, 20-inch corded saw-tip tool | `B077ZC3NGZ` | `black-decker-behts300` | https://amzn.to/4pl62vv | Corded |
| Greenworks 22122, 22-inch corded tool | `B0069Z7JV8` | `greenworks-22122` | https://amzn.to/44oSmpF | Corded |
| BLACK+DECKER BEHT100, 16-inch corded tool | `B08LYYWBWN` | `black-decker-beht100` | https://amzn.to/4w2fUNj | Corded |
| Greenworks HT40B212, 24-inch kit with 2.0 Ah battery and charger | `B086PSCXJT` | `greenworks-ht40b212` | https://amzn.to/4fzLOuA | Cordless |
| EGO HT2501, 25-inch kit with 2.5 Ah battery and charger | `B09C2S51F5` | `ego-ht2501` | https://amzn.to/4bG0p5c | Cordless |
| BLACK+DECKER LHT2436, 24-inch kit with battery and charger | `B00602J4MM` | `black-decker-lht2436` | https://amzn.to/4vVs1eS | Cordless |

## Governance

1. Gate 1 verifies exact model/package identity, ASIN, manufacturer support, variation integrity, and recall status.
2. Gate 2 is the publisher's manual confirmation of the selected Amazon variation, commercial eligibility, and generated Special Link.
3. Publication-day price, stock, seller, fulfillment, package, and redirect checks are freshness checks, not a third approval gate.
4. The same exact package must use one ASIN and affiliate destination everywhere in the cluster.
5. Published links require the article disclosure and CMS-applied `rel="sponsored"`.
6. Rejected products are documented only in the relevant `research.md`; they do not receive active product files or register rows.
