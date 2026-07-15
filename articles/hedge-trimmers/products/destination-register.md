# Hedge-trimmer Amazon destination register

**Market:** Amazon.com, United States  
**Last synchronized:** July 15, 2026
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
| CRAFTSMAN CMCPHT818D1, pole-trimmer kit with 2.0 Ah battery and charger | `B083WQ1LBC` | `craftsman-cmcpht818d1` | https://amzn.to/44qzyGB | Pole |
| WORX WG252.9, pole-trimmer bare tool | `B07W8RXJ8B` | `worx-wg252-9` | https://amzn.to/4hel9ol | Pole |
| BLACK+DECKER LPHT120B, pole-trimmer bare tool | `B00AZW9Y9G` | `black-decker-lpht120b` | https://amzn.to/3QYflF0 | Pole |
| Husqvarna 122LKH, gas long-reach hedge trimmer | `B0DQ725L11` | `husqvarna-122lkh` | https://amzn.to/3SSCJnY | Pole |

## Governance

1. Gate 1 verifies exact model/package identity, ASIN, manufacturer support, variation integrity, and recall status.
2. Gate 2 is the publisher's manual confirmation of the selected Amazon variation, commercial eligibility, and generated Special Link.
3. Publication-day price, stock, seller, fulfillment, package, and redirect checks are freshness checks, not a third approval gate.
4. The same exact package must use one ASIN and affiliate destination everywhere in the cluster.
5. Published links require the article disclosure and CMS-applied `rel="sponsored"`.
6. Rejected products are documented only in the relevant `research.md`; they do not receive active product files or register rows.
